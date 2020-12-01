const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const quizesRoute = require('./routes/quizes');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true }, () => 
        console.log("Contected to db"
));

app.use(cors());
app.use(express.json()); //Middleware

app.use('/api/auth', authRoute); // Route Middlewares
app.use('/api/user', userRoute); // Route Middlewares
app.use('/api/quizes', quizesRoute); // Route Middlewares

app.listen(PORT, () => console.log(`Server is running...`));