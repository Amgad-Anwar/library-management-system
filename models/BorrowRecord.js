const db = require('../config/db');

class BorrowRecord {
    static borrowBook(borrowerId, bookId, callback) {
        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // 1 week due date
        const query = `INSERT INTO borrow_records (borrower_id, book_id, borrow_date, due_date) VALUES (?, ?, ?, ?)`;
        db.query(query, [borrowerId, bookId, borrowDate, dueDate], callback);
    }

    static returnBook(borrowerId, bookId, callback) {
        const query = `UPDATE borrow_records SET returned = TRUE WHERE borrower_id = ? AND book_id = ? AND returned = FALSE`;
        db.query(query, [borrowerId, bookId], callback);
    }

    static getBorrowedBooks(borrowerId, callback) {
        const query = `
            SELECT b.id, b.title, b.author, br.due_date 
            FROM books b
            JOIN borrow_records br ON b.id = br.book_id
            WHERE br.borrower_id = ? AND br.returned = FALSE`;
        db.query(query, [borrowerId], callback);
    }

    static getOverdueBooks(callback) {
        const query = `
            SELECT b.id, b.title, b.author, br.due_date 
            FROM books b
            JOIN borrow_records br ON b.id = br.book_id
            WHERE br.returned = FALSE AND br.due_date < NOW()`;
        db.query(query, callback);
    }
}

module.exports = BorrowRecord;
