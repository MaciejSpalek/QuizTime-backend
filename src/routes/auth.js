const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../helpers/validation');

router.post('/register', async (req, res) => {
    
    //Validation the data before we a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the EMAIL is already in the databease
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Checking if the NAME is already in the databease
    const nameExist = await User.findOne({name: req.body.name});
    if(nameExist) return res.status(400).send('Name already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {expiresIn: `${process.env.TOKEN_LIFE_TIME}s`});
        res.header('auth-token', token).status(200).send({
            name: savedUser.name,
            token,
            tokenLifeTime: +process.env.TOKEN_LIFE_TIME
        });
    } catch(error) { 
        res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    
    //Validation the data before we a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the databease
    const user = await User.findOne({name: req.body.name});
    if(!user) return res.status(400).send('Name is not found');

    //Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    // Create and assign a token
    const token = jwt.sign(
        { _id: user._id }, 
        process.env.TOKEN_SECRET, 
        {expiresIn: `${process.env.TOKEN_LIFE_TIME}s`}
    );

    res.header('auth-token', token).status(200).send({
        tokenLifeTime: +process.env.TOKEN_LIFE_TIME,
        name: req.body.name,
        token
    });
})

router.get('/status', async (req, res) => {
    try {
        res.status(200).send(true);
    } catch(error) { 
        res.status(400);
    }
});



module.exports = router;