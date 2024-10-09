const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateJWT = require('./middleware/authMiddleware');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});


app.use('/api/auth', authRoutes);

// Protect routes by authMiddleware
app.use('/api/books', authenticateJWT, bookRoutes);
app.use('/api/borrowers', authenticateJWT, borrowerRoutes);
app.use('/api/borrow', authenticateJWT, borrowRoutes);

module.exports = app;
