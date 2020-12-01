const mongoose = require('mongoose');
const Answer = require('./Answer').schema

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 10,
        max: 75
    },
    answers: [Answer]
});

module.exports = mongoose.model('Question', questionSchema);