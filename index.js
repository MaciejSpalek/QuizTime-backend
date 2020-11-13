const express = require('express');
const app = express();

const authRoute = require('./Routes/auth');

// Route Middlewares
app.use('/api/user', authRoute)


app.listen(5000, () => console.log(`Server is running...`));