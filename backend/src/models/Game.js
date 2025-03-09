const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Game title is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Game date is required']
    },
    location: {
        type: String,
        required: [true, 'Game location is required'],
        trim: true
    },
    teams: [{
        type: String,
        trim: true
    }],
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);