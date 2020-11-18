const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    return Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    }).validate(data)
}

const loginValidation = (data) => {
    return Joi.object({
        name: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    }).validate(data)
}


module.exports = {
    registerValidation,
    loginValidation
}
