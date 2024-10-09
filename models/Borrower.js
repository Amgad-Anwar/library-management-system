const db = require('../config/db');

class Borrower {
    static getAllBorrowers(callback) {
        db.query('SELECT * FROM borrowers', callback);
    }

    static addBorrower(borrowerData, callback) {
        const query = `INSERT INTO borrowers (name, email, registered_date) VALUES (?, ?, ?)`;
        db.query(query, [borrowerData.name, borrowerData.email, borrowerData.registered_date], callback);
    }

    static updateBorrower(id, borrowerData, callback) {
        const query = `UPDATE borrowers SET name = ?, email = ? WHERE id = ?`;
        db.query(query, [borrowerData.name, borrowerData.email, id], callback);
    }

    static deleteBorrower(id, callback) {
        db.query('DELETE FROM borrowers WHERE id = ?', [id], callback);
    }
}

module.exports = Borrower;
