import auth0 from '../../lib/auth0'

var DB;

function getdb() {
  // Connect to DB
  var sqlite3 = require('sqlite3').verbose()
  const DB_PATH = 'db.db'
  DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
      console.log('Error: '+err);
      return;
    }
    console.log('Connected to ' + DB_PATH + ' database.')
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

function initdb() {
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

export default async function me(req, res) {
  const session = await auth0.getSession(req)
  if (!session || !session.user) {
    res.status(401).end()
  } else { // User is logged in
    console.log(__dirname)
    console.log("HERE ---------------------------->", req.body.id, req.body.year, req.body.vote)
    console.log(session.user)

    getdb()
    initdb()
    DB.close()
    res.status(200).end()
  }
}
