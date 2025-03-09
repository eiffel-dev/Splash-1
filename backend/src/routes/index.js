const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');
const GameController = require('../controllers/gameController');

const indexController = new IndexController();
const gameController = new GameController();

router.get('/', (req, res) => indexController.getHome(req, res));
router.get('/data', (req, res) => indexController.getData(req, res));

// Game Planning Routes
router.post('/games', (req, res) => gameController.createGame(req, res));
router.get('/games', (req, res) => gameController.getGames(req, res));
router.get('/games/:id', (req, res) => gameController.getGame(req, res));
router.put('/games/:id', (req, res) => gameController.updateGame(req, res));
router.delete('/games/:id', (req, res) => gameController.deleteGame(req, res));

// Game Tracking Routes
router.post('/games/:id/track', (req, res) => {
  // TODO: Add game tracking logic
});

router.get('/games/:id/stats', (req, res) => {
  // TODO: Add game stats retrieval logic
});

const setRoutes = (app) => {
    app.use('/api', router);
};

module.exports = { setRoutes };