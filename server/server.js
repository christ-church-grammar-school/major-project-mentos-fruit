const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const userDB = low(new FileSync('./db.json'))
const imageDB = low(new FileSync('./imagedb.json'))
const db = low(new FileSync('votes.json'))
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const withAuth = require('./middleware')
const puppeteer = require('puppeteer')
const URL = "https://nexus.ccgs.wa.edu.au"
const TIMETABLE = "https://nexus.ccgs.wa.edu.au/timetable"
const path = require('path')

userDB.defaults({users: []}).write()
imageDB.defaults({users: []}).write()
db.defaults({ candidate: [], groupcandidate: [], vote: []}).write()
app.use(bodyParser())
app.use(cookieParser())

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

            try {
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
            } catch {
                console.log("PROFILE IMAGE FAILED")
                output.image = "Does not have one";
            }
            try {
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
            } catch {
                console.log("PROFILE IMAGE FAILED")
                var data = {};
                data.studentID = "Javascript is amazing";
                data.dateOfBirth = "Javascript is amazing";
                data.yearLevel = "Javascript is amazing";
                data.tutor = "Javascript is amazing";
                data.house = "Javascript is amazing";
                data.tutorGroup = "Javascript is amazing";
                data.studentType = "Javascript is amazing";
                output.data = data;
            }

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

/////////////////////////// Voting //////////////////////////////////////////////////////

function initdb() {
	db.defaults({ candidate: [], groupcandidate: [], vote: []})
	.write()
}

function addCandidate(candid, sname, syear, sbio) {
	// Add information about candidate
	if (db.get('candidate').find({ studentid: candid}).value() == undefined) {
		// Create new user
		db.get('candidate')
		.push({ studentid: candid, name: sname, year: syear, bio: sbio })
		.write()
	} else {
		// Update user's information
		db.get('candidate')
		.find({ studentid: candid })
		.assign( { name: sname, year: syear, bio: sbio } )
		.write()
	}
}

function addCandGroup(candidateid, grouptype) {
	// Add candidate to a group
	if (db.get('groupcandidate').find({ studentid: candidateid, group: grouptype }).value() == undefined) {
		// (Candidateid, grouptype) does not exist in table
		db.get('groupcandidate')
		.push( { studentid: candidateid, group: grouptype } )
		.write()
	}
}

function addVote(id, grouptype, candidateid, preference, syear, yearlevel) {
	// Add vote
	if (db.get('vote').find({ voterid: id, group: grouptype, cand: candidateid }).value() != undefined) {
		// Error: voter has already voted for this candidate in this election
		return
    }
    if (db.get('vote').find({ voterid: id, group: grouptype, pref: preference }).value() != undefined) {
		// Error: voter has already voted for this position in this election
		return
	}
	// Add vote
	db.get('vote')
	.push({ voterid: id, group: grouptype, cand: candidateid, pref: preference, year: syear, yeargroup: yearlevel }) 
	.write() 
}

function worse(a, b) {
	// If candidates a and b have the same number of current and initial votes, return 0
	// Else return 1 if candidate a should be eliminated before candidate b, and -1 otherwise
	
	// Test if both numbers of votes are equal
	if (a[0] == b[0] && a[1] == b[1]) {
		return 0
	}
	// Consider current votes
	if (a[0] != b[0]) {
		return (a[0] < b[0]) ? 1 : -1
	}
	// Break ties by initial votes
	return (a[1] < b[1]) ? 1 : -1
}

function getCandidates(curyear, grouptype) {
	// Return all candidates for current election

	// allcandidates contains all candidates in correct year
	allcandidates = db.get('candidate')
	.filter({ year: curyear })
	.map('studentid')
	.value()
	candidates = [] // Candidates for this particular group
	for (var i=0; i<allcandidates.length; i++) {
		if (db.get('groupcandidate').find({ studentid: allcandidates[i], group: grouptype }).value()) {
			candidates.push(allcandidates[i]) // Add candidate
		}
	}
	return candidates
}

function calcResults(curyear, grouptype) {
	/*This function implements the preferential voting algorithm
	 It will perform all rounds to determine the order of candidates,
	 even if a candidate already has a majority.
	 If there are multiple tied candidates to be removed,
	 the candidate with the least number of initial first-choice votes is eliminated.
	 If there is a further tie, all tied candidates are removed.
	*/

	candidates = getCandidates(curyear, grouptype)

	// Get all votes for this election
	allvotes = db.get('vote')
	.filter({ group: grouptype, year: curyear })
	.cloneDeep()
	.value()

	// Group votes by voter
	voterchoice = {}
	for (var i=0; i<allvotes.length; i++) {
		var vote = allvotes[i]
		if (!(vote.voterid in voterchoice)) {
			// Voter does not exist in dictionary. Add it.
			voterchoice[vote.voterid] = []
		}
		voterchoice[vote.voterid].push([vote.pref, vote.cand])
	}

	initial = {} // Stores number of initial, first-place votes 
	for (var i=0; i<candidates.length; i++) {
		initial[candidates[i]] = 0
	}

	for (var voter in voterchoice) {
		// Sort preferences in descending order
		choices = voterchoice[voter]
		choices.sort(function(a, b) {
			return b[0]-a[0]
		})
		initial[choices[choices.length-1][1]]++
		voterchoice[voter] = []
		for (var i=0; i<choices.length; i++) {
			voterchoice[voter].push(choices[i][1])
		}
	}

	order = [] // Final order of candidates
	while (candidates.length > 0) {
		current = {} // Stores current votes for this round
		for (var i=0; i<candidates.length; i++) {
			current[candidates[i]] = 0
		}

		for (var voter in voterchoice) {
			if (voterchoice[voter].length == 0) {
				// All preferences have been eliminated
				continue
			}
			current[voterchoice[voter][voterchoice[voter].length-1]]++
		}

		eliminate = [candidates[0]]
		for (var i=1; i<candidates.length; i++) {
			var candidate = candidates[i]
			var query = worse([current[candidate], initial[candidate]], [current[eliminate[0]], initial[eliminate[0]]])
			if (query == 1) {
				// New worse candidate
				eliminate = [candidate]
			} else if (query == 0) {
				// Equally bad candidate
				eliminate.push(candidate)
			}
		}

		// Remove votes with the top preference eliminated
		for (var voter in voterchoice) {
			if (voterchoice[voter][voterchoice[voter].length-1] in eliminate) {
				voterchoice[voter].pop()
			}
		}

		// Update the list of candidates
		updatedcandidates = []
		for (var i=0; i<candidates.length; i++) {
			if (!eliminate.includes(candidates[i])) {
				updatedcandidates.push(candidates[i])
			}
		}
		candidates = updatedcandidates
		// Add eliminated candidates to output array
		order.push(eliminate)
	}
	
	// Return order of candidates, from best to worst
	order.reverse()
	return order
}

function calcTally(curyear, grouptype, yearlevel) {
	// Returns a tally of the first-preference votes for each year level
	// If yeargroup == '', then this returns the tally for all year groups
	var allvotes
	if (yearlevel == '') {
		allvotes = db.get('vote')
		.filter({ group: grouptype, year: curyear, pref: 1 })
		.cloneDeep()
		.value()
	} else {
		allvotes = db.get('vote')
		.filter({ group: grouptype, year: curyear, pref: 1, yeargroup: yearlevel})
		.cloneDeep()
		.value()
	}

	candidates = getCandidates(curyear, grouptype)
	tally = {} // Stores number of votes
	for (var i=0; i<candidates.length; i++) {
		tally[candidates[i]] = 0;
	}
	for (var i=0; i<allvotes.length; i++) {
		tally[allvotes[i].cand]++;
	}
	return tally;
}

app.get('/api/addcandidate', function(req, res) {
    try {
        var userObj = userDB.get('users').find({id: req.user}).value()
        addCandidate(userObj.id, userObj.name.slice(14).split(',')[0], new Date().getFullYear(), '')
        res.sendStatus(200)
    } catch {
        res.sendStatus(400)
    } finally {
        return
    }
})

app.get('/api/addcandgroup', function(req, res) {
    try {
        var userObj = userDB.get('users').find({id: req.user}).value()
        addCandidate(userObj.id, req.body.group);
        res.sendStatus(200)
    } catch {
        res.sendStatus(400)
    } finally {
        return
    }
})

app.get('/api/addvote', function(req, res) {
    try {
        var userObj = userDB.get('users').find({id: req.user}).value()
        addVote(userObj.id, req.body.group, req.body.candid, req.body.pref, new Date().getFullYear(), userOBj.data.yearLevel)
        res.sendStatus(200)
    } catch {
        res.sendStatus(400)
    } finally {
        return
    }
})

app.get('/api/calcresults', function(req, res) {
    try {
        res.json(calcResults(new Date().getFullYear(), res.body.group))
    } catch {
        res.sendStatus(400)
    } finally {
        return
    }
})

app.get('/api/calctally', function(req, res) {
    try {
        res.json(calcTally(new Date().getFullYear(), res.body.group, req.body.yearlevel))
    } catch {
        res.sendStatus(400)
    } finally {
        return
    }
})

/////////////////////////// Voting //////////////////////////////////////////////////////

app.listen(process.env.PORT, () => console.log('Server Started! Port:', process.env.PORT));