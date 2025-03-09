const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  notes: String,
  teams: [{
    name: String,
    color: String,
    players: [String]
  }],
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed'],
    default: 'planned'
  }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);