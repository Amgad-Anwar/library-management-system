const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static register(userData, callback) {
        // Hash password before storing it
        bcrypt.hash(userData.password, 10, (err, hash) => {
            if (err) return callback(err);

            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(query, [userData.username, hash], callback);
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
