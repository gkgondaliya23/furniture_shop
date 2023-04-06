require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

//db connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB Connected...!'))
    .catch((err) => {
        console.log(err);
    });
    
// use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const authController = require('./routes/auth');
const userController = require('./routes/user');
const productController = require('./routes/product');
const cartController = require('./routes/cart');
const orderController = require('./routes/order');
const favoritesController = require('./routes/favorites');

app.use('/api/auth', authController);
app.use('/api/users', userController);
app.use('/api/products', productController);
app.use('/api/carts', cartController);
app.use('/api/orders', orderController);
app.use('/api/favorites', favoritesController);

app.listen(port, ()=>{
    console.log(`server is start at ${port}`);
})