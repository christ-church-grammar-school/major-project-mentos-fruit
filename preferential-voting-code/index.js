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
	db.defaults({ candidate: [], voter: [], groupcandidate: [], group: [], vote: []})
	.write()
}

function write(id) {
	if (db.get('voter').find({ voterid: id }).value()) {
		// Already exists
		db.get('voter')
		.find( { voterid: id })
		.assign({ voterid:'test'})
		.write()
	} else {
		// Create new row
		db.set('voter', [{ voterid:id}])
		.write()
	}
}

initdb()
write('1015634S')