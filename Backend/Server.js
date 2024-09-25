import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { client } from './database.js'
const app = express();
import auth from './routes/auth.js';

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.connect()
    .then(console.log("database connected"))
    .catch(err => {
        console.log("error connecting to database");
    });
app.use('/auth', auth)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



//0Ve4vZuYyGnW02tR
// dynamic url code
// app.get('/blogs/:id', (req, res) => {
//     const id=req.params.id
// })