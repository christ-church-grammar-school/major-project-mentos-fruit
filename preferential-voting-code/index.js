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
	db.defaults({ candidate: [], vote: []})
	.write()
}

function addCandidate(candid, sname, syear, sbio) {
	if (db.get('candidate').find({ studentid: candid}).value() == undefined) {
		// Create new user
		console.log('test1')
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

initdb()

// test database
addCandidate('test@student.ccgs.wa.edu.au', 'Fname Lname', 2020, 'I am dumb')
addVote('1015634@student.ccgs.wa.edu.au', 'Wolsey', 'test@student.ccgs.wa.edu.au', 1);