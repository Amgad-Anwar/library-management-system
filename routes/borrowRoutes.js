const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.post('/', borrowController.borrowBook);
router.put('/return', borrowController.returnBook);
router.get('/borrowed/:borrowerId', borrowController.getBorrowedBooks);
router.get('/overdue', borrowController.getOverdueBooks);

module.exports = router;
