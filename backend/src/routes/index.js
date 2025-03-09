const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');

const indexController = new IndexController();

router.get('/', (req, res) => indexController.getHome(req, res));
router.get('/data', (req, res) => indexController.getData(req, res));

// Game Planning Routes
router.post('/games', (req, res) => {
  // TODO: Add game creation logic
});

router.get('/games', (req, res) => {
  // TODO: Add game retrieval logic
});

router.get('/games/:id', (req, res) => {
  // TODO: Add single game retrieval logic
});

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