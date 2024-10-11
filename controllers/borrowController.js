const BorrowRecord = require('../models/BorrowRecord');

exports.borrowBook = (req, res) => {
    const { borrowerId, bookId } = req.body;

    BorrowRecord.borrowBook(borrowerId, bookId, (err, result) => {
        if (err) {
            if (err.message === 'This book is already borrowed by the borrower') {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: 'Book borrowed', id: result.insertId });
    });
};


exports.returnBook = (req, res) => {
    const { borrowerId, bookId } = req.body;
    BorrowRecord.returnBook(borrowerId, bookId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
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
