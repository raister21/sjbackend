const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database: 'salmon'
})

const getLoginStatus = (passwordClient, passwordServer) =>{
    if (passwordClient == passwordServer){
        return true
    } else {
        return false
    }
}
exports.loginAttempt = (req,res) => {
    try {
        connection.query( `SELECT * FROM Account WHERE username = '${req.body.username}'` ,(error, rows) => {
            if (rows.length == 1){
                if (getLoginStatus(req.body.password,rows[0]['password'])){
                    res.statusCode = 200;
                    res.send(rows[0]);
                    console.log(res.statusCode)
                } else {
                    res.statusCode = 404;
                    res.end()
                    console.log(res.statusCode)
                }
            }
            });
    } catch (e) {
        res.statusCode = 404;
        res.end();
        console.log(e)

    }
}

exports.getProfile = (req, res) => {
    try{
        connection.query( `SELECT Account.username,Account.dob, Account.gender, Diet.name FROM Account INNER JOIN UserDetails ON Account.username = UserDetails.username INNER JOIN Diet ON UserDetails.dietId = Diet.dietId WHERE Account.username = '${req.params.username}'` ,(error, rows) => {
        
            if (rows.length == 1){
                    res.statusCode = 200;
                    res.send(rows[0]);
                    console.log(rows[0])
            }
            });
    }catch (e){
        res.statusCode = 404;
        res.end();
        console.log(e)
    }
}