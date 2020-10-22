const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const userDB = low(new FileSync('./db.json'));
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
        
            // Confirmed to not exist
            bcrypt.hash(password,10,function(err, hashedPassword) {
                userDB.get('users').push({ id: user, name: "pending", hash: hashedPassword, timetable: "pending"}).write();
            });

            const payload = { user: user };
            var token = jwt.sign(payload, process.env.SECRET, {expiresIn: process.env.TOKENEXPIRY});
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);

            await page.click('input[id=idBtn_Back]');
            await page.waitForNavigation({'waitUntil': 'networkidle0', timeout: redirectTimeoutLength}).catch((err) => {
                console.log("Nexus Is Dead");
            })
            await page.goto(TIMETABLE, { waitUntil: 'networkidle0' });
            var output = {name: "", timetable: ""};
            output.name = await page.evaluate(() => document.querySelector("#content > div:nth-child(5) > div:nth-child(1) > h1").innerHTML);
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
            output.image = await page.evaluate(() => {
                function getBase64Image(img) {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var dataURL = canvas.toDataURL("image/png");
                    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                }
                return getBase64Image(document.querySelector("#profile-drop > img"));
            });

            userDB.get('users').find({id: user}).assign({name: output.name,timetable: output.timetable, image: output.image}).write(); // UPDATE TIMETABLE
            console.log('process complete', user)

            await browser.close();
            return;
        }
    }
});

app.get('/api/checkToken', withAuth, function(req, res) {
    res.json({loggedIn: true})
});

app.get('/api/logout', function(req, res){
    console.log("logout")
    res.cookie("token", "", { expires: new Date() });
    res.sendStatus(200);
});

app.listen(process.env.PORT, () => console.log('Server Started! Port:', process.env.PORT));