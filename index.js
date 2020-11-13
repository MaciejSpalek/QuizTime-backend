const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const dotenv = require('dotenv');


dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
() => console.log("Contected to db"))


// Route Middlewares
app.use('/api/user', authRoute)
app.listen(5000, () => console.log(`Server is running...`));