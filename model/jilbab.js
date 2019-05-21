const conn = require('./databaseConfig');

const pembeliDb = {
    getJilbab: (callback) => {
        conn.getConnection((err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('Connected');
            const sql = 'SELECT * FROM pembeli';
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
    getJilbabId: (id, callback) => {
        conn.getConnection((err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('Connected');
            const sql = 'SELECT * FROM pembeli WHERE code=?';
            con.query(sql, [id], (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        });
    },
    addJilbab: (name, description, images, price, quantity, item_code, callback) => {
        conn.getConnection((err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('Connected');
            const shortid = require('shortid');
            const id = shortid.generate();
            const sql = 'INSERT INTO pembeli (id, name, description, images, price, quantity, item_code) values (?, ?, ?, ?, ?, ?, ?)';
            con.query(sql, [id, name, description, images, price, quantity, item_code], (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        });
    },
    updateJilbab: (id, name, description, images, price, quantity, item_code, callback) => {
        conn.getConnection((err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('Connected');
            const sql = 'UPDATE pembeli SET nama=?, lokasi=?, kuantitas=?, tanggal=?, kategori=? WHERE code=?';
            con.query(sql, [name, description, images, price, quantity, item_code, id], (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        });
    },
    deleteJilbab: (id, callback) => {
        conn.getConnection((err, con) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('Connected');
            const sql = 'DELETE FROM pembeli WHERE code=?';
            con.query(sql, [id], (err, res) => {
                con.release();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        });
    }
}

module.exports = pembeliDb;
