import express from 'express';
import { client } from '../database.js'; // import client client
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const router = express.Router();


router.post('/signup', async (req, res) => {

    const { email, password } = req.body;

    const { data: existingUser, error: fetchError } = await client
        .from('Testing')
        .select('email')
        .eq('email', email)
        .single();
    if (existingUser || fetchError) {
            console.log("User already exists");
    }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

      
        const { error: insertError } = await client
            .from('Users')
            .insert([{ email, password: hashedPassword }]);

        if (insertError) {
            console.error('Error inserting data:', insertError);
            return res.status(500).json({ message: "Error creating user" });
        }

        console.log("User inserted successfully");
        res.status(201).json({ message: "User created successfully" });
    });

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await client
            .from('users')
            .select('email, password')
            .eq('email', email)
            .single();

        if (!user || user.error) {
            return res.status(401).json({ message: "No such user found" });
        }

        const checkPassword = await bcrypt.compare(password, user.data.password);
        if (checkPassword) {
            console.log('Signin successful');
            // Token generation, cookie/session logic can go here
            return res.status(200).json({ message: "Sign in successfully" });
        }

        return res.status(400).json({ message: "Invalid password" });
    } catch (error) {
        console.error('Error during signin:', error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
