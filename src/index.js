const express = require('express');
const app = express();

app.use(express.json());

const predefinedEmails = [
    'george.bluth@reqres.in',
    'janet.weaver@reqres.in',
    'emma.wong@reqres.in',
    'eve.holt@reqres.in',
    'charles.morris@reqres.in',
    'tracey.ramos@reqres.in'
];

let users = [];

// Registration API
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    // Check if the email is in the predefined list
    if (!predefinedEmails.includes(email)) {
        return res.status(400).json({ error: 'Email not allowed' });
    }

    // Check if the email is already registered
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character' });
    }

    // Register the user
    users.push({ email, password });
    return res.status(200).json({ message: 'User registered successfully' });
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user is registered
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Validate password
    if (user.password !== password) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Success response (for simplicity, returning a static token)
    return res.status(200).json({ token: 'fake-jwt-token' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
