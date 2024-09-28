import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route.js'; // Correct import

const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the user route correctly
app.use('/user', userRoute);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
