import auth0 from '../../lib/auth0'

export default async function me(req, res) {
  const session = await auth0.getSession(req)
  if (!session || !session.user) {
    res.status(401).end()
  } else { // User is logged in
    console.log(__dirname);
    console.log(req.body)
    console.log(session.user)
    
    var sqlite3 = require('sqlite3').verbose();
    const DB_PATH = 'db.db';
    const DB = new sqlite3.Database(DB_PATH, function(err){
      if (err) {
        console.log('Error: '+err);
        return;
      }
      console.log('Connected to ' + DB_PATH + ' database.')
    });

    var dbSchema = `CREATE TABLE IF NOT EXISTS Counter (
      ID integer NOT NULL PRIMARY KEY,
      name text UNIQUE,
      count integer Default 0
      );`
  
    DB.exec(dbSchema, function(err){
        if (err) {
            console.log(err)
        }
    });

    DB.close()
    res.status(200).end()
  }
}
