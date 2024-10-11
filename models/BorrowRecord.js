const db = require('../config/db');

class BorrowRecord {
    static borrowBook(borrowerId, bookId, callback) {
        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // 1 week due date
    
        // Check if the book is available
        const checkAvailabilityQuery = `SELECT available_quantity FROM books WHERE id = ?`;
        db.query(checkAvailabilityQuery, [bookId], (err, results) => {
            if (err) return callback(err);
            
            if (results.length === 0) {
                return callback(new Error('Book not found'));
            }
    
            const availableQuantity = results[0].available_quantity;
            
            if (availableQuantity <= 0) {
                return callback(new Error('Book is not available for borrowing'));
            }
    
            // Check if the borrower has already borrowed the book
            const checkBorrowQuery = `SELECT * FROM borrow_records WHERE borrower_id = ? AND book_id = ? AND returned = 0`;
            db.query(checkBorrowQuery, [borrowerId, bookId], (err, results) => {
                if (err) return callback(err);
                
                if (results.length > 0) {
                    return callback(new Error('This book is already borrowed by the borrower'));
                }
    
                // Proceed with borrowing if book is available and not already borrowed
                const insertQuery = `INSERT INTO borrow_records (borrower_id, book_id, borrow_date, due_date) VALUES (?, ?, ?, ?)`;
                db.query(insertQuery, [borrowerId, bookId, borrowDate, dueDate], (err, result) => {
                    if (err) return callback(err);
    
                    // Update available_quantity in books table
                    const updateQuery = `UPDATE books SET available_quantity = available_quantity - 1 WHERE id = ?`;
                    db.query(updateQuery, [bookId], (err) => {
                        if (err) return callback(err);
    
                        callback(null, result);
                    });
                });
            });
        });
    }
    
    
    static returnBook(borrowerId, bookId, callback) {
        const updateBorrowRecordQuery = `UPDATE borrow_records SET returned = 1 WHERE borrower_id = ? AND book_id = ? AND returned = 0`;
        
        db.query(updateBorrowRecordQuery, [borrowerId, bookId], (err, result) => {
            if (err) return callback(err);
            
            if (result.affectedRows === 0) {
                return callback(new Error('No active borrowing record found for this book'));
            }
    
            // Update available_quantity in books table by incrementing it
            const updateBookQuantityQuery = `UPDATE books SET available_quantity = available_quantity + 1 WHERE id = ?`;
            db.query(updateBookQuantityQuery, [bookId], (err) => {
                if (err) return callback(err);
    
                callback(null, { message: 'Book returned successfully' });
            });
        });
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
