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
    }
});

module.exports = mongoose.model('Score', scoreSchema);