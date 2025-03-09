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

    async getGames(req, res) {
        try {
            const games = await Game.find().sort({ date: -1 });
            res.status(200).json(games);
        } catch (error) {
            console.error('Error fetching games:', error);
            res.status(500).json({ error: 'Failed to fetch games' });
        }
    }

    async getGame(req, res) {
        try {
            const game = await Game.findById(req.params.id);
            if (!game) {
                return res.status(404).json({ error: 'Game not found' });
            }
            res.status(200).json(game);
        } catch (error) {
            console.error('Error fetching game:', error);
            res.status(500).json({ error: 'Failed to fetch game' });
        }
    }

    async updateGame(req, res) {
        try {
            const game = await Game.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!game) {
                return res.status(404).json({ error: 'Game not found' });
            }
            res.status(200).json(game);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ 
                    error: 'Validation Error', 
                    details: Object.values(error.errors).map(err => err.message)
                });
            }
            console.error('Error updating game:', error);
            res.status(500).json({ error: 'Failed to update game' });
        }
    }

    async deleteGame(req, res) {
        try {
            const game = await Game.findByIdAndDelete(req.params.id);
            if (!game) {
                return res.status(404).json({ error: 'Game not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting game:', error);
            res.status(500).json({ error: 'Failed to delete game' });
        }
    }
}

module.exports = GameController;