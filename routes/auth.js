const express = require('express');
const routes = express.Router();
const {registerAuth, loginAuth} = require('../controller/auth');

// Register User
routes.post('/register', registerAuth);

// Login User
routes.post('/login', loginAuth);

module.exports = routes;
