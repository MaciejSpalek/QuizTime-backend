const mongoose = require('mongoose');
const Question = require('./Question');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    author: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    amountOfQuestions: {
        type: Number,
        required: true,
        min: 5,
        max: 25
    },
    primaryColor: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    secondaryColor: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    iconName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    questions: [Question]
});

module.exports = mongoose.model('Quiz', quizSchema);