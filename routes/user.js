const express = require('express');
const { verifyTokenAuth } = require('./verifyToken');
const routes = express.Router();
const {getAllUser,updateUser, deleteUser, forgotPassword} = require('../controller/user');

routes.get('/',getAllUser);
routes.put('/:id', verifyTokenAuth, updateUser);
routes.post('/forgotpassword',forgotPassword);

routes.delete('/:id', deleteUser);


module.exports = routes;