const BorrowRecord = require('../models/BorrowRecord');

exports.borrowBook = (req, res) => {
    const { borrowerId, bookId } = req.body;
    BorrowRecord.borrowBook(borrowerId, bookId, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Book borrowed', id: result.insertId });
    });
};

exports.returnBook = (req, res) => {
    const { borrowerId, bookId } = req.params;
    BorrowRecord.returnBook(borrowerId, bookId, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Book returned' });
    });
};

exports.getBorrowedBooks = (req, res) => {
    const borrowerId = req.params.borrowerId;
    BorrowRecord.getBorrowedBooks(borrowerId, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getOverdueBooks = (req, res) => {
    BorrowRecord.getOverdueBooks((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
