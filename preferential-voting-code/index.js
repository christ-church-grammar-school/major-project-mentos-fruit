// import { sqlIsStupid } from "wow"

// function getAvailableVotes(id) {
// 	// return array with available voting selection names
// }

// function recordVote(yearGroup, house, isBoarding, voteSelection, id) {
// 	// record vote or something
// }

// getAvailableVotes(1010101@student.ccgs.wa.edu.au)

// recordVote(2022, "Romsey", true, type="school_captain", 1010101@student.ccgs.wa.edu.au)


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('votes.json')
const db = low(adapter)

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
function addVote(id, grouptype, candidateid, preference) {
	// Add vote
	if (db.get('vote').find({ voterid: id, group:grouptype, cand:candidateid }).value() != undefined) {
		// Error: voter has already voted before in this election
		return
	}
	// Add vote
	db.get('vote')
	.push({ voterid: id, group:grouptype, cand:candidateid, pref:preference }) 
	.write() 
}

function calcResults(curyear, grouptype) {
	// Perform preferential voting algorithm

	// allcandidates contains all candidates in correct year
	allcandidates = db.get('candidate')
	.filter({ year: curyear })
	.map('studentid')
	.value()
	candidates = []; // Candidates for this particular group
	for (var i=0; i<allcandidates.length; i++) {
		if (db.get('groupcandidate').find({ studentid: allcandidates[i], group: grouptype }).value()) {
			candidates.push(allcandidates[i]) // Add candidate
		}
	}
	console.log(candidates)
}

initdb()

// test database
addCandidate('test@student.ccgs.wa.edu.au', 'Fname Lname', 2020, 'I am dumb')
addCandidate('test2@student.ccgs.wa.edu.au', 'Fname2 Lname2', 2020, 'I am dumber')
addCandidate('test3@student.ccgs.wa.edu.au', 'Fname3 Lname3', 2019, 'I am dumbest')
addCandGroup('test@student.ccgs.wa.edu.au', 'Wolsey')
addCandGroup('test@student.ccgs.wa.edu.au', 'School')
addCandGroup('test2@student.ccgs.wa.edu.au', 'Romsey')
addCandGroup('test3@student.ccgs.wa.edu.au', 'Wolsey')
addVote('1015634@student.ccgs.wa.edu.au', 'Wolsey', 'test@student.ccgs.wa.edu.au', 1);
calcResults(2020, 'Wolsey')