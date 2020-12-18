const mongoose = require('mongoose');
const Question = require('./Question').schema;


const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    author: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    amountOfQuestions: {
        type: Number,
        required: true,
        min: 5,
        max: 25
    },
    colors: {
        primary: { type: String },
        secondary: { type: String }
    },
    iconName: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
        required: true
    },
    questions: [Question]
});

module.exports = mongoose.model('Quiz', quizSchema);