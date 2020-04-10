var routes = require('express').Router();
var userRoute = require('./user');

routes.use('/user', userRoute);

module.exports = routes;