import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route.js'; // Correct import
import cookieParser from 'cookie-parser'
import authMiddleware from './middleware/confirmuser.js';
const app = express();

app.use(cors());

// Enable CORS
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],// Specify the exact origin
    credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));

// Use the user route correctly
app.use('/user', userRoute);

app.get('/protected', authMiddleware, (req, res) => {
    // If we reach here, the token is valid, and the user is authenticated
    res.status(200).json({
        message: `Welcome back, ${req.user.email}`,
        role: req.user.role,
    });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
