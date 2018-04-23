var mysql = require('mysql');

var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sasa',
        database: 'marketplacedb',
        port: 3306
    });


//module.exports.connect = () => {
    // db.connect((err) => {
    //     if(err){
    //         throw err;
    //     }
    //     console.log('MySql Connected...');
    // });
//}

// module.exports.close = () => {
//     db.end();
// }

module.exports = db;