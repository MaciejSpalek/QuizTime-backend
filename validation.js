const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    return Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }).validate(data)
}

const loginValidation = (data) => {
    return Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }).validate(data)
}


module.exports = {
    registerValidation,
    loginValidation
}
