const express = require('express');
const router = express.Router();
const {getCart, getAllCart, creatCart, updateCart, removeCart} = require('../controller/cart');


router.post('/', creatCart);
router.get('/', getAllCart);
router.get('/:userId', getCart);
router.put('/:cartItemId', updateCart);
router.delete('/:userId/:cartItemId',removeCart);


module.exports = router;