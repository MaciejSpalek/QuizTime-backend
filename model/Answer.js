const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model('Answer', answerSchema);