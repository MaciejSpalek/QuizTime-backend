const mongoose = require('mongoose');
const Answer = require('./Answer');

const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    answers: [Answer]
});

module.exports = mongoose.model('Question', questionSchema);