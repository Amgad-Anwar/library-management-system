const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static register(userData, callback) {
        // Hashing password 
        bcrypt.hash(userData.password, 10, (err, hash) => {
            if (err) return callback(err);

            const query = 'INSERT INTO users (username, password , email) VALUES (?, ?, ?)';
            db.query(query, [userData.username, hash , userData.email], callback);
        });
    }
    static findByUsernameOrEmail(username, email, callback) {
        const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(query, [username, email], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results.length > 0 ? results[0] : null);
        });
    }
    

    static findByUsername(username, callback) {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    }

    static comparePassword(password, hash, callback) {
        bcrypt.compare(password, hash, callback);
    }
}

module.exports = User;
