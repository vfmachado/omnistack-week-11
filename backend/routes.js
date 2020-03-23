const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
    res.send("Data from server")
});

module.exports = routes;