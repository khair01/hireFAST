import { client } from '../Database/database.js'; // import client
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    let { firstName, lastName, email, phone_number, password, role } = req.body;

    if (!firstName || !lastName || !email  || !password || !role) {
        return res.status(400).json({
            message: "Some Fields are missing",
            success: false
        });
    }

    const { data: existingUser, error: fetchError } = await client
        .from('users') 
        .select('email')
        .eq('email', email)
        .single();

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error: insertError } = await client
        .from('users')
        .insert([{ first_name:firstName, last_name:lastName, email: email, phone_number: phone_number, password: hashedPassword, role }]);

    if (insertError) {
        console.error('Error inserting data:', insertError);
        return res.status(500).json({
            message: "Error creating user",
            success: false
        });
    }
    return res.status(201).json({
        message: "User Registered Successfully",
        success: true
    });
};

export const login = async (req, res) => {
    let { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            message: "Some Fields are missing",
            success: false
        });
    }

    const { data: user, error: fetchError } = await client
        .from('users')
        .select('first_name,last_name,email, password, role')  
        .eq('email', email)
        .single();

  
    if (fetchError || !user) {
        return res.status(400).json({
            message: "User does not exist",
            success: false
        });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials",
            success: false
        });
    }

    // Check if the role matches
    if (role !== user.role) {
        return res.status(400).json({
            message: "Invalid Role",
            success: false
        });
    }

    // Generate JWT token if login is successful
    const token_data = { email: user.email, role: user.role }; // Simplified token data
    const token = jwt.sign(token_data, 'hireFAST', { expiresIn: '1h' });

    res.cookie('token', token, { 
        maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day
        httpOnly: true,
        secure: true, 
        sameSite: 'strict' 
    });

    return res.status(200).json({
        message: `Welcome Back ${user.first_name} ${user.last_name}`,
        success: true,
        // token: token
    });
};

export const Logout = async (req, res) => {

    res.clearCookie('token');

    return res.status(200).json({
        message: "Logged Out Successfully",
        success: true
    });
};
