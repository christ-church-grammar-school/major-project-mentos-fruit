import auth0 from '../../lib/auth0'

export default async function me(req, res) {
    const session = await auth0.getSession(req)
    if (!session || !session.user) {
        res.status(401).end()
        
    } else { // User is logged in
        console.log(req.body)
        console.log(session.user)

        var mysql = require('mysql');
        
        var con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "yourpassword",
        });
        
        console.log(mysql);
        console.log(con);
        /*con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("CREATE DATABASE mydb", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });
        });*/

        res.status(200).end()
    }
}
