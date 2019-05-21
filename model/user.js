const conn = require('./databaseConfig');

const userDb = {
    getUser: (callback) => {
        conn.getConnection((err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            const sql = 'SELECT * FROM user';
            con.query(sql, null, (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        });
    },
    addUser: (nama, email, password, callback) => {
        conn.getConnection(async (err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            const shortid = require('shortid');
            const bcryptjs = require('bcryptjs');
            const id = shortid.generate();
            const pwd = await bcryptjs.hash(password, 10);
            const sql = 'INSERT INTO user (id, nama, email, password) values (?, ?, ?, ?)';
            con.query(sql, [id, nama, email, pwd], (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        });
    },
    loginUser: (email, password, callback) => {
        conn.getConnection(async (err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            const bcryptjs = require('bcryptjs');
            const sql = 'SELECT * FROM user WHERE email=?';
            con.query(sql, [email], (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                bcryptjs.compare(password, res[0].password, (fail, succ) => {
                    if (fail) {
                        console.log(fail);
                        return callback(fail, null);
                    } else if (succ) {
                        return callback(null, res);
                    }
                    console.log('wrong password');
                    return callback(err, null);
                });
            });
        });
    }
}

module.exports = userDb;