const Borrower = require('../models/Borrower');

exports.getAllBorrowers = (req, res) => {
    Borrower.getAllBorrowers((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.addBorrower = (req, res) => {
    const borrowerData = req.body;
    Borrower.addBorrower(borrowerData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Borrower added', id: result.insertId });
    });
};

exports.updateBorrower = (req, res) => {
    const borrowerId = req.params.id;
    const borrowerData = req.body;
    Borrower.updateBorrower(borrowerId, borrowerData, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Borrower updated' });
    });
};

exports.deleteBorrower = (req, res) => {
    const borrowerId = req.params.id;
    Borrower.deleteBorrower(borrowerId, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Borrower deleted' });
    });
};
