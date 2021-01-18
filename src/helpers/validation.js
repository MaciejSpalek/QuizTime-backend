const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    return Joi.object({
        name: Joi.string().min(3).max(15).required(),
        password: Joi.string().min(6).max(100).required(),
        email: Joi.string().required()
    }).validate(data)
}

const loginValidation = (data) => {
    return Joi.object({
        name: Joi.string().min(3).max(15).required(),
        password: Joi.string().min(6).max(100).required()
    }).validate(data)
}


module.exports = {
    registerValidation,
    loginValidation
}
