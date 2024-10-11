require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;


exports.register = (req, res) => {
    const { username, password, email } = req.body;

    // Check if the username or email already exists
    User.findByUsernameOrEmail(username, email, (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error'+ err });
        if (user) return res.status(400).json({ error: 'Username or email already exists' });

        // If no user found, proceed to register
        User.register({ username, password, email }, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};



exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, users) => {
        if (err) return res.status(500).json({ error: err });
        if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = users[0];
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err });
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            // Generate a JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token ,user });
        });
    });
};
