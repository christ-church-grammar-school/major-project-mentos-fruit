const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const userDB = low(new FileSync('./db.json'));
const imageDB = low(new FileSync('./imagedb.json'));
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const withAuth = require('./middleware');
const puppeteer = require('puppeteer');
const URL = "https://nexus.ccgs.wa.edu.au";
const TIMETABLE = "https://nexus.ccgs.wa.edu.au/timetable";
const path = require('path')

userDB.defaults({users: []}).write();
imageDB.defaults({users: []}).write();

app.use(bodyParser());
app.use(cookieParser());

process.env.SECRET = "IVomitWordsOntoPageToMakeFakeSecurityKey";
process.env.TOKENEXPIRY = "2h";
process.env.PORT = 4000;

app.post('/api/authenticate', async function(req, res) {
    var { user, password } = req.body;
    console.log("User Login Request: " + user)
    var userObj = userDB.get('users').find({id: user}).value()
    
    if (userObj !== undefined) { // DOES EXIST  
        bcrypt.compare(password,userObj.hash, function(err, result) { // Plaintext password vs hashed
            if (result === false) { // Incorrect Password
                res.status(401).json({
                    error: 'Incorrect username or password'
                });
                return;
            } else { // Correct Password
                const payload = { user: user };
                var token = jwt.sign(payload, process.env.SECRET, {expiresIn: process.env.TOKENEXPIRY});
                res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                console.log("Confirmed")
                return;
            }
        });        
    } else {

        /* Initiate the Puppeteer browser */
        var browser = await puppeteer.launch({headless: true}); // default is true
        const page = await browser.newPage();
        var timeoutLength = 2000;
        var redirectTimeoutLength = 50000;
        await page.goto(URL, { waitUntil: 'networkidle0' });
        await page.$eval('input[type=email]', (el, user) => el.value = user, user);
        await page.click('input[type=submit]');
        try {
            await page.waitForSelector('#displayName', {visible: true, timeout: timeoutLength});
            // Further logic
            await page.$eval('input[type=password]', (el, password) => el.value = password, password);
            await page.click('input[type=submit]');
            try {
                await page.waitForSelector('#passwordError', {visible: true, timeout: timeoutLength});
                var result = false;
            } catch {
                var result = true;
            }
        } catch {
            console.log("Webscrape Failed")
            var result = false;
        } 
        if (!result) {
            res.status(401).json({
                error: 'Incorrect username or password'
            });
            await browser.close();
            return;
        } else {
            console.log('credentials correct');
        
            

            await page.click('input[id=idBtn_Back]');
            await page.waitForNavigation({'waitUntil': 'networkidle0', timeout: redirectTimeoutLength}).catch((err) => {
                console.log("Nexus Is Dead");
            })
            await page.goto(TIMETABLE, { waitUntil: 'networkidle0' });
            var output = {name: "", timetable: ""};
            try {
                output.name = await page.evaluate(() => document.querySelector("#content > div:nth-child(5) > div:nth-child(1) > h1").innerHTML)
            } catch {
                console.log("Account creation is not enabled on weekends");
                res.status(401).json({
                    error: 'Account creation is not enabled on weekends.'
                });
                return;
            }
            


            // Confirmed to not exist
            bcrypt.hash(password,10,function(err, hashedPassword) {
                userDB.get('users').push({ id: user, name: "pending", hash: hashedPassword, timetable: "pending"}).write();
                imageDB.get('users').push({ id: user }).write();
            });

            output.timetable = await page.evaluate(() => {
                var rows = document.querySelectorAll("#content > div:nth-child(5) > div:nth-child(2) > div > table > tbody > tr")
                var arr = []
                var iter = 0;
                rows.forEach((e) => {
                    node = e.childNodes;
                    var dummyArr = []
                    var iter2 = 0;
                    node.forEach((e) => {
                        dummyArr[iter2] = e.innerText
                        iter2++;
                    })
                    var filtered = dummyArr.filter(function (el) {
                        return el != null;
                      });
                    arr[iter] = filtered;
                    iter++;
                })
                return arr
            });

            var link = await page.evaluate(() => {
                return document.querySelector("#profile-options > li:nth-child(2) > a").href;
            });

            await page.goto(link, { waitUntil: 'networkidle0' });

            output.image = await page.evaluate( async () => {
                loadImage = async img => {
                    return new Promise((resolve, reject) => {
                        img.onload = async () => {
                            resolve(true);
                        };
                    });
                };
                
                  var img = new Image();
                  img.crossOrigin = 'Anonymous';
                    img.src = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-2.columns.no-pad > img").src;
                    await loadImage(img)
                  
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    var dataURL;
                    canvas.height = img.naturalHeight;
                    canvas.width = img.naturalWidth;
                    ctx.drawImage(img, 0, 0);
                    dataURL = canvas.toDataURL();
                    return dataURL
            });

            output.data = await page.evaluate(() => {
                var data = {};
                data.studentID = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(4)").innerText;
                data.dateOfBirth = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(6)").innerText;
                data.yearLevel = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(8)").innerText;
                data.tutor = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(10) > a").innerText;
                data.house = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(12)").innerText;
                data.tutorGroup = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(14)").innerText;
                data.studentType = document.querySelector("#content > div:nth-child(3) > div > section > div > div > div.small-12.medium-10.columns.no-pad > dl > dd:nth-child(18)").innerText;
                return data;
            });

            userDB.get('users').find({id: user}).assign({name: output.name,timetable: output.timetable, data: output.data}).write(); // UPDATE TIMETABLE
            imageDB.get('users').find({id: user}).assign({image: output.image}).write(); 
            console.log('process complete', user)

            const payload = { user: user };
            var token = jwt.sign(payload, process.env.SECRET, {expiresIn: process.env.TOKENEXPIRY});
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);

            await browser.close();
            return;
        }
    }
});

app.get('/api/checkToken', withAuth, function(req, res) {
    try {
        var userObj = userDB.get('users').find({id: req.user}).value()
        var imageObj = imageDB.get('users').find({id: req.user}).value()
        res.json({loggedIn: true, ...userObj, image : imageObj.image})
    } catch {
        res.sendStatus(404)
        return
    }
});

app.get('/api/logout', function(req, res){
    console.log("logout")
    res.cookie("token", "", { expires: new Date() });
    res.sendStatus(200);
});

app.listen(process.env.PORT, () => console.log('Server Started! Port:', process.env.PORT));