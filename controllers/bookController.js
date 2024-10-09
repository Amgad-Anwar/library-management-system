const Book = require('../models/Book');

exports.getAllBooks = (req, res) => {
    Book.getAllBooks((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.addBook = (req, res) => {
    const bookData = req.body;
    Book.addBook(bookData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Book added', id: result.insertId });
    });
};

exports.updateBook = (req, res) => {
    const bookId = req.params.id;
    const bookData = req.body;
    Book.updateBook(bookId, bookData, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Book updated' });
    });
};

exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    Book.deleteBook(bookId, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Book deleted' });
    });
};

exports.searchBooks = (req, res) => {
    const searchTerm = req.query.q;
    Book.searchBooks(searchTerm, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
