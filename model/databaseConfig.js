const mysql = require('mysql');
const dbConnect = mysql.createPool({
    host: 'remotemysql.com',
    user: '0QaIzZwU44',
    password: 'bWCGHQWGWp',
    database: '0QaIzZwU44'
});

module.exports = dbConnect;
