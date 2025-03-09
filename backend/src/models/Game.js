const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Player name is required'],
        trim: true
    },
    capsNumber: {
        type: Number,
        required: [true, 'Cap number is required'],
        min: [1, 'Cap number must be at least 1'],
        max: [15, 'Cap number cannot exceed 15']
    }
});

const teamSchema = new mongoose.Schema({
    color: {
        type: String,
        enum: ['white', 'blue'],
        required: true
    },
    players: [playerSchema]
});

// Add validation for unique cap numbers within a team
teamSchema.pre('validate', function(next) {
    const capNumbers = this.players.map(p => p.capsNumber);
    const uniqueCaps = new Set(capNumbers);
    
    if (capNumbers.length !== uniqueCaps.size) {
        this.invalidate('players', 'Duplicate cap numbers are not allowed within a team');
        return next(new Error('Duplicate cap numbers are not allowed within a team'));
    }
    next();
});

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Game title is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Game date and time is required']
    },
    location: {
        type: String,
        trim: true,
        default: ''  // Make location optional with empty default
    },
    teams: [teamSchema],
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);