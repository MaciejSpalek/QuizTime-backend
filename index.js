const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const dotenv = require('dotenv');


dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, 
    { useNewUrlParser: true }, () => 
        console.log("Contected to db"
))


app.use(express.json()); //Middleware
app.use('/api/user', authRoute) // Route Middlewares
app.listen(5000, () => console.log(`Server is running...`));