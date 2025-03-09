const Game = require('../models/Game');

class GameController {
    async createGame(req, res) {
        try {
            const gameData = req.body;
            
            // Create new game using mongoose model
            const game = new Game(gameData);
            await game.save();

            res.status(201).json(game);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ 
                    error: 'Validation Error', 
                    details: Object.values(error.errors).map(err => err.message)
                });
            }
            console.error('Error creating game:', error);
            res.status(500).json({ error: 'Failed to create game' });
        }
    }
}

module.exports = GameController;