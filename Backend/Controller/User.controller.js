import { pool } from '../Database/database.js'; // Import your PostgreSQL pool configuration
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Registration
export const register = async (req, res) => {
    const { firstName, lastName, email, phone_number, password, role } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({
            message: "Some Fields are missing",
            success: false,
        });
    }

    try {
        // Check if user already exists
        const existingUserQuery = 'SELECT email FROM users WHERE email = $1';
        const { rows: existingUsers } = await pool.query(existingUserQuery, [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const insertUserQuery = `
            INSERT INTO users (first_name, last_name, email, phone_number, password, role)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await pool.query(insertUserQuery, [
            firstName,
            lastName,
            email,
            phone_number,
            hashedPassword,
            role,
        ]);

        return res.status(201).json({
            message: "User Registered Successfully",
            success: true,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: "Error creating user",
            success: false,
        });
    }
};

// User Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            message: "Some Fields are missing",
            success: false,
        });
    }

    try {
        // Fetch user by email
        const userQuery = `
            SELECT first_name, last_name, email, password, role,id
            FROM users
            WHERE email = $1
        `;
        const { rows: users } = await pool.query(userQuery, [email]);
        const user = users[0];

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
            });
        }
        console.log("user from db", user);
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false,
            });
        }

        // Generate JWT
        const token_data = { email: user.email, role: user.role, id: user.id };
        const token = jwt.sign(token_data, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('jwttoken', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
        });

        return res.status(200).json({
            message: `Welcome Back ${user.first_name} ${user.last_name}`,
            success: true,
            role: user.role,
            id: user.id
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({
            message: "Error logging in",
            success: false,
        });
    }
};

// User Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwttoken", {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
        });

        return res.status(200).json({
            message: "Logout successful",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging out",
            success: false,
        });
    }
};
