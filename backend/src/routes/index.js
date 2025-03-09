const express = require('express');
const IndexController = require('../controllers/index');

const setRoutes = (app) => {
    const router = express.Router();
    const indexController = new IndexController();

    router.get('/', indexController.home);
    router.get('/api/data', indexController.getData);
    // Add more routes as needed

    app.use('/api', router);
};

module.exports = setRoutes;