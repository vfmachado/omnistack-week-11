const { Router } = require('express');

const OngController = require('./controllers/OngController');
const OngProfileController = require('./controllers/OngProfileController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const routes = Router();


routes.get('/', (req, res) => {
    return res.json({msg: "Server is running and answering..."});
});


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', OngProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete)


module.exports = routes;