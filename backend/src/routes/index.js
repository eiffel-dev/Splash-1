const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');

const indexController = new IndexController();

router.get('/', (req, res) => indexController.getHome(req, res));
router.get('/data', (req, res) => indexController.getData(req, res));

const setRoutes = (app) => {
    app.use('/api', router);
};

module.exports = { setRoutes };