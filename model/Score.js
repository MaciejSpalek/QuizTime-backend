const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    quizID: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    executor: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Score', scoreSchema);