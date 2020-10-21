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
    
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch({headless: true}); // default is true
    const page = await browser.newPage();
    var timeoutLength = 2000;
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
    if (result) {
        console.log('credentials correct');
    } else {
        res.status(401).json({
            error: 'Incorrect username or password'
        });
        browser.close();
        return;
    }
    await page.click('input[id=idBtn_Back]');
    await page.waitForNavigation({'waitUntil': 'networkidle0'});
    await page.goto(TIMETABLE, { waitUntil: 'networkidle0' });
    var output = {name: "", timetable: ""};
    output.name = await page.evaluate(() => document.querySelector("#content > div:nth-child(5) > div:nth-child(1) > h1").innerHTML);
    output.timetable = await page.evaluate(() => document.querySelector("#content > div:nth-child(5) > div:nth-child(2) > div > table > tbody").innerHTML);
    
    // SOMEONE ELSE CAN PROCESS OUTPUT DATA

    // SUCCESSFUL LOGIN
    var userObj = userDB.get('users').find({username: user}).value()

    if (userObj !== undefined) { // EXISTS
        userDB.get('users').find({id: user}).assign({timetable: output.timetable}).write(); // UPDATE TIMETABLE
    } else { // CREATE USER
        bcrypt.hash(password,10,function(err, hashedPassword) {
            userDB.get('users').push({ id: user, name: output.name, hash: hashedPassword, timetable: output.timetable}).write();
        });
    }

    const payload = { user: user };
    var token = jwt.sign(payload, process.env.SECRET, {expiresIn: process.env.TOKENEXPIRY});
    res.cookie('token', token, { httpOnly: true }).sendStatus(200);

    console.log('process complete')

    browser.close();
    return;
});

app.get('/api/checkToken', withAuth, function(req, res) {
    res.sendStatus(200)
});

app.listen(process.env.PORT, () => console.log('Server Started! Port:', process.env.PORT));