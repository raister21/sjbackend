const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database: 'salmon'
})

const getTodaysDate = () =>{
    var today = new Date();
    
    return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
}

const getEndOfWeekDate = () =>{
    var date = new Date();
    if (date.getDate() < 8){
        return 7;
    } else if (date.getDate() < 15){
        return 14;
    } else if (date.getDate() < 22){
        return 21;
    } else if (date.getDate() < 29 ){
        return 29;
    } else if (date.getDate() < 31){
        return 31
    }
}

const getWeekDate = () => {
    var today = new Date();
    
    return today.getFullYear() + '-' + (today.getMonth()+1) + '-' 
}


exports.getTodaysCalorieStatus = (req,res) => {
    try {
        connection.query( `SELECT * FROM UserProgress WHERE username = '${req.params.username}' AND progressDate = '${getTodaysDate()}'` ,(error, rows) => {
            res.statusCode = 200;
                console.log(rows);
                res.send(rows)
            });
    } catch (e) {
        res.statusCode = 404;
        res.end();
        console.log(e)

    }
}

exports.getDiet = (req,res) => {
    try {
        connection.query( `SELECT * FROM Diet INNER JOIN UserDetails ON Diet.dietId = UserDetails.dietId WHERE UserDetails.username = '${req.params.username}'` ,(error, rows) => {
            res.statusCode = 200;
                console.log(rows)
                res.send(rows)
            });
    } catch (e) {
        res.statusCode = 404;
        res.end();
        console.log(e)

    }
}

exports.postDailyCalorie = (req, res) => {
    try{
        connection.query( `INSERT INTO UserProgress (progressDate, carbsIntake, proteinIntake, fatIntake, waterIntake, username) VALUES ('${getTodaysDate()}', ${req.body.carbs},${req.body.proteins},${req.body.fats},0,'${req.body.username}')` ,(error, rows) => {
            res.statusCode = 200;
                console.log('posted');
                res.send(rows)
            });
    }catch(e){
        res.statusCode = 404
        res.end()
        console.log(e)
    }
}

exports.postDailyWater = (req, res) => {
    console.log("adding water")
    try{
        connection.query( `INSERT INTO UserProgress (progressDate, carbsIntake, proteinIntake, fatIntake, waterIntake, username) VALUES ('${getTodaysDate()}', 0,0,0,${req.body.water},'${req.body.username}')` ,(error, rows) => {
            res.statusCode = 200;
                console.log('posted');
                res.send(rows)
            });
    }catch(e){
        res.statusCode = 404
        res.end()
        console.log(e)
    }
}

exports.getWeeklyCalorieStatus = (req,res) => {
    console.log(`SELECT * FROM UserProgress WHERE username = '${req.params.username}' AND progressDate BETWEEN '${getWeekDate()}${getEndOfWeekDate() - 6}' AND '${getWeekDate()}${getEndOfWeekDate()}'`);
    try {
        connection.query( `SELECT * FROM UserProgress WHERE username = '${req.params.username}' AND progressDate BETWEEN '${getWeekDate()}${getEndOfWeekDate() - 6}' AND '${getWeekDate()}${getEndOfWeekDate()}'` ,(error, rows) => {
            res.statusCode = 200;
                
                res.send(rows)
            });
    } catch (e) {
        res.statusCode = 404;
        res.end();
        console.log(e)

    }
}
