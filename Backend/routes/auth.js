import express from 'express';
import { client } from '../database.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email is already in the database
        const checkEmail = await client.query('SELECT email FROM users WHERE email = $1', [email]);

        if (!checkEmail || checkEmail.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        // Insert new user into the database
        await client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
        console.log("data inserted successfully");
        // Return success response
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error('Error during signup:', error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await client.query('SELECT email,password FROM users WHERE email = $1', [email]);

        if (!user || user.rows.length > 0) {
            const checkPassword = await bcrypt.compare(password, user.rows[0].password);
            if (checkPassword) {
                console.log('signin successful');
                return res.status(200).json({ message: "sign in successfully" });
            }
            return res.status(400).json({ message: "invalid password" });
        }
        return res.status(401).json({ message: "no such user found" })
    } catch (error) {
        console.error('Error during signup:', error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
