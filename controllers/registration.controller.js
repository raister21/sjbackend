const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database: 'salmon'
})


exports.register = (req, res) => {
    try {
        connection.query( `INSERT INTO Account (username, password, name, dob, gender, profile) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.name}', '${req.body.dob}', '${req.body.gender}', NULL);`);
        res.end();
    } catch (e) {
        res.statusCode = 404;
        res.end();
        console.log(e)

    }
}

exports.addDetails = (req, res) => {
    try {
        console.log("Adding details")
        connection.query( `INSERT INTO UserDetails (height, weight, dietId, username) VALUES ('${req.body.height}', '${req.body.weight}', '${req.body.code}', '${req.body.username}');`);
        res.end();
        
    } catch (e) {
        res.statusCode = 404;
        console.log("Adding details failed")
        res.end();
        console.log(e)

    }
}