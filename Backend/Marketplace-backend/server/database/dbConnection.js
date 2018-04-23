var mysql = require('mysql');

module.exports = () => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sasa',
        database: 'node_mysql',
        port: 3306
    });
}