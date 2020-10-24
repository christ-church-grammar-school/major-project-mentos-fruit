import auth0 from '../../lib/auth0'

var DB;

function getDB() {
  // Connect to DB
  var sqlite3 = require('sqlite3').verbose()
  const DB_PATH = 'db.db'
  DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
      console.log('Error: '+err);
      return;
    }
    console.log('Connected to ' + DB_PATH + ' database.')
    // Enable foreign keys
    DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
      if (error){
          console.error("Pragma statement didn't work.")
          console.log(error)
      } else {
          console.log("Foreign Key Enforcement is on.")
      }
    });
  });
}

function initDB() {
  // Create tables in db
  var dbSchema = 
    `CREATE TABLE IF NOT EXISTS CANDIDATE (
    CAND_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    STUDENT_ID TEXT NOT NULL,
    NAME TEXT NOT NULL,
    YEAR INTEGER,
    BIO TEXT
    );

    CREATE TABLE IF NOT EXISTS VOTER (
      VOTER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      STUDENT_ID TEXT NOT NULL,
      NAME TEXT NOT NULL,
      YEAR TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS GROUPS (
      GROUP_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      GROUP_NAME TEXT NOT NULL
    ); 
    
    CREATE TABLE IF NOT EXISTS GROUP_CANDIDATE (
      GROUP_ID INTEGER,
      CAND_ID INTEGER,
      FOREIGN KEY(GROUP_ID) REFERENCES GROUPS(GROUP_ID),
      FOREIGN KEY(CAND_ID) REFERENCES CANDIDATE(CAND_ID)
    );

    CREATE TABLE IF NOT EXISTS VOTE (
      VOTE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      VOTER_ID TEXT,
      GROUP_ID INTEGER,
      CAND_ID INTEGER,
      PREF INTEGER,
      FOREIGN KEY(VOTER_ID) REFERENCES VOTER(VOTER_ID),
      FOREIGN KEY(GROUP_ID) REFERENCES GROUPS(GROUP_ID),
      FOREIGN KEY(CAND_ID) REFERENCES CANDIDATE(CAND_ID)

    );`

  DB.exec(dbSchema, function(err){
      if (err) {
          console.log(err)
      }
  });
}

function execute(sql, param) {
  // Execute SQL statement
  DB.run(sql, param, function(err) {
    if (err) {
      console.log(err)
    }
  })
}

function update(sql1, param1, sql2, param2, sql3, param3) {
  // Update fields of preexisting row if it exists
  // Otherwise create a new row
  // sql1 & param1- check whether a row exists
  // sql2 & param2- updates fields
  // sql3 & param3- inserts new row
  DB.get(sql1, param1, function(err, row) {
    if (err) {
      console.log(err)
    }
    if (row) {
      // Row found; update data
      execute(sql2, param2);
    } else {
      // Row not found; insert new row
      execute(sql3, param3);
    }
  })
}

function addData(id, name, year, vote) {
  // Add/update user's data to tables

  // Update VOTER table
  update(
    `SELECT * FROM VOTER WHERE STUDENT_ID=?`,
    [id], 
    `UPDATE VOTER
    SET NAME=?, YEAR=?
    WHERE STUDENT_ID=?`,
    [name, year, id],
    `INSERT INTO VOTER(STUDENT_ID, NAME, YEAR) VALUES (?, ?, ?)`,
    [id, name, year]
  )
  
}

export default async function me(req, res) {
  const session = await auth0.getSession(req)
  if (!session || !session.user) {
    res.status(401).end()
  } else { // User is logged in
    console.log(__dirname)
    console.log("HERE ---------------------------->", req.body.id, req.body.name, req.body.year, req.body.vote)
    console.log(session.user)

    getDB()
    initDB()
    addData(req.body.id, req.body.name, req.body.year, req.body.vote);
    DB.close()
    res.status(200).end()
  }
}
