const db = require('../config/db');

class Book {
    static getAllBooks(callback) {
        db.query('SELECT * FROM books', callback);
    }

    static getBookById(id, callback) {
        db.query('SELECT * FROM books WHERE id = ?', [id], callback);
    }

    static searchBooks(searchTerm, callback) {
        const query = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?`;
        const search = `%${searchTerm}%`;
        db.query(query, [search, search, search], callback);
    }

    static addBook(bookData, callback) {
        const query = `INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [bookData.title, bookData.author, bookData.isbn, bookData.available_quantity, bookData.shelf_location], callback);
    }

    static updateBook(id, bookData, callback) {
        const query = `UPDATE books SET title = ?, author = ?, isbn = ?, available_quantity = ?, shelf_location = ? WHERE id = ?`;
        db.query(query, [bookData.title, bookData.author, bookData.isbn, bookData.available_quantity, bookData.shelf_location, id], callback);
    }

    static deleteBook(id, callback) {
        db.query('DELETE FROM books WHERE id = ?', [id], callback);
    }
}

module.exports = Book;
