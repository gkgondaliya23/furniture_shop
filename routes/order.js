const express = require('express');
const routes = express.Router();
const {createOrder, getAllOrders, getOrder, getUserOrder, updateOrder, deleteOrder} = require('../controller/order');

routes.post('/', createOrder);
routes.get('/', getAllOrders);
routes.get('/:id', getOrder);
routes.get('/user/:userId', getUserOrder);
routes.put('/:id', updateOrder);
routes.delete('/:id', deleteOrder);
module.exports = routes;