const express = require('express');
const { verifyTokenAuth } = require('./verifyToken');
const routes = express.Router();
const {getAllUser,updateUser, deleteUser} = require('../controller/user');

routes.get('/',getAllUser);
routes.put('/:id', verifyTokenAuth, updateUser);


routes.delete('/:id', deleteUser);


module.exports = routes;