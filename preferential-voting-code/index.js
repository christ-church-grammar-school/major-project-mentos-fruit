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
function addVote(id, grouptype, candidateid, preference, syear) {
	// Add vote
	if (db.get('vote').find({ voterid: id, group: grouptype, cand: candidateid }).value() != undefined) {
		// Error: voter has already voted before in this election
		return
	}
	// Add vote
	db.get('vote')
	.push({ voterid: id, group: grouptype, cand: candidateid, pref: preference, year: syear }) 
	.write() 
}

function worse(a, b) {
	// If candidates a and b have the same number of current and initial votes, return 0
	// Else return 1 if candidate a should be eliminated before candidate b, and -1 otherwise
	
	// Test if both numbers of votes are equal
	if (a[0] == b[0] && a[1] == b[1]) {
		return 0;
	}
	// Consider current votes
	if (a[0] != b[0]) {
		return (a[0] < b[0]) ? 1 : -1;
	}
	// Break ties by initial votes
	return (a[1] < b[1]) ? 1 : -1;
}

function calcResults(curyear, grouptype) {
	/*This function implements the preferential voting algorithm
	 It will perform all rounds to determine the order of candidates,
	 even if a candidate already has a majority.
	 If there are multiple tied candidates to be removed,
	 the candidate with the least number of initial first-choice votes is eliminated.
	 If there is a further tie, all tied candidates are removed.
	*/

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
		initial[candidates[i]] = 0;
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
			current[candidates[i]] = 0;
		}

		for (var voter in voterchoice) {
			if (voterchoice[voter].length == 0) {
				// All preferences have been eliminated
				continue;
			}
			current[voterchoice[voter][voterchoice[voter].length-1]]++
		}

		eliminate = [candidates[0]]
		for (var i=1; i<candidates.length; i++) {
			var candidate = candidates[i];
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

// test database
initdb()
addCandidate('test@student.ccgs.wa.edu.au', 'Fname Lname', 2020, 'I am dumb')
addCandidate('test2@student.ccgs.wa.edu.au', 'Fname2 Lname2', 2020, 'I am dumber')
addCandidate('test3@student.ccgs.wa.edu.au', 'Fname3 Lname3', 2019, 'I am dumbest')
addCandidate('test4@student.ccgs.wa.edu.au', 'Fname4 Lname4', 2020, 'I am even dumber')
addCandGroup('test@student.ccgs.wa.edu.au', 'Wolsey')
addCandGroup('test@student.ccgs.wa.edu.au', 'School')
addCandGroup('test2@student.ccgs.wa.edu.au', 'Romsey')
addCandGroup('test3@student.ccgs.wa.edu.au', 'Wolsey')
addCandGroup('test4@student.ccgs.wa.edu.au', 'Wolsey')
addVote('1015634@student.ccgs.wa.edu.au', 'Wolsey', 'test@student.ccgs.wa.edu.au', 2, 2020);
addVote('1015634@student.ccgs.wa.edu.au', 'Wolsey', 'test4@student.ccgs.wa.edu.au', 1, 2020);
addVote('testvoter@student.ccgs.wa.edu.au', 'Wolsey', 'test@student.ccgs.wa.edu.au', 2, 2020);
addVote('testvoter@student.ccgs.wa.edu.au', 'Wolsey', 'test4@student.ccgs.wa.edu.au', 1, 2020);

console.log(calcResults(2020, 'Wolsey'))