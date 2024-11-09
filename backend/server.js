const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2d4b88bg',
    database: 'user_auth'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});

app.post('/register', (req, res) => {
    const { username, email, password, department, role, mobileNumber } = req.body;
    const query = 'INSERT INTO users (username, email, password, department, role, mobile_number) VALUES (?, ?, ?, ?, ?, ?)';
    
    // Inserting password in plain text (not recommended for security reasons)
    db.query(query, [username, email, password, department, role, mobileNumber], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send({ message: 'Error inserting user' });
        } else {
            const token = jwt.sign({ id: result.insertId, role: role }, 'secretkey', { expiresIn: '1h' });
            req.session.token = token;
            res.status(201).send({ token });
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send({ message: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(401).send({ message: 'Email not found' });
        } else {
            const user = results[0];
            // For simplicity, here we compare plain text password; use bcrypt in production
            if (password === user.password) {
                // Mocking token generation; use a proper authentication method (e.g., JWT) in production
                const token = 'mocked_token';
                req.session.token = token;
                res.status(200).send({ message: 'Login successful', token, role: user.role }); // Include role in the response
            } else {
                res.status(401).send({ message: 'Incorrect password' });
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
