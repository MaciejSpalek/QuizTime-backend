const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');


mongoose.connect('mongodb+srv://spwrtt:<password>@cluster0.zver3.mongodb.net/<dbname>?retryWrites=true&w=majority', 
{ useNewUrlParser: true },
() => console.log("Contected to db"))


// Route Middlewares
app.use('/api/user', authRoute)
app.listen(5000, () => console.log(`Server is running...`));