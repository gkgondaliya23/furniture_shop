const CartItems = require('../model/cart');
const Order = require('../model/order');
const Product = require('../model/product');
const User = require('../model/user');

// Order with cart to added product
exports.createOrder = async (req, res) => {
    try {
        const orderItemIds = await Promise.all(
            req.body.products.map(async (orderitem) => {
                const newOrderItemId = new CartItems({
                    user: req.body.user,
                    products:[{
                        productId: orderitem.productId,
                        quantity: orderitem.quantity
                    }]
                });
                const savedOrderItemId = await newOrderItemId.save();
                return savedOrderItemId._id;
            })
        );

        const productItemIds = await Promise.all(
            orderItemIds.map(async (orderItemId) => {
                const orderItem = await CartItems.findById(orderItemId).populate({
                    path: 'products',
                    populate:{
                       path: 'productId',
                       select: 'price'
                    }
                });
                const productIds = orderItem.products.map(product => product.productId);
                const quantities = orderItem.products.map(product => product.quantity);
                return { productIds, quantities };
            })
        );

        const totalPrices = await Promise.all(
            productItemIds.map(async (productItem) => {
                let totalPrice = 0;
                for (let i = 0; i < productItem.productIds.length; i++) {
                    const product = await Product.findById(productItem.productIds[i]);
                    const quantity = productItem.quantities[i];
                    totalPrice += (product.price * quantity);
                }
                return totalPrice;
            })
        );

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

        const newOrder = await Order({
            user: req.body.user,
            products: req.body.products,
            amount: totalPrice,
            address: req.body.address,
        }).save();

        res.json({ newOrder , message: 'Product added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.getAllOrders = async (req, res) => {
    try {
        const allOrder = await Order.find({}).populate({
            path: 'user',
            select: 'name email',
        })
            .populate({
                path: 'products',
                populate: {
                    path: 'productId',
                    select: "title price category",
                }
            })
            .sort({ dateOrderd: -1 });
        res.status(200).json(allOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getOrder = async (req, res) => {
    try {
        const getOrder = await Order.findById(req.params.id).populate({
            path: "user",
            select: "name email"
        })
            .populate({
                path: "products",
                populate: {
                    path: "productId",
                    select: "title price category",
                }
            });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getUserOrder = async (req, res) => {
    try {
        const getOrder = await Order.find({user: req.params.userId}).populate({
            path: "user",
            select: "name email"
        })
            .populate({
                path: "products",
                populate: {
                    path: "productId",
                    select: "title price category",
                }
            });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const orderItemIds = await Promise.all(
            req.body.products.map(async (orderitem) => {
                const newOrderItemId = new CartItems({
                    user: req.body.user,
                    products:[{
                        productId: orderitem.productId,
                        quantity: orderitem.quantity
                    }]
                });
                const savedOrderItemId = await newOrderItemId.save();
                return savedOrderItemId._id;
            })
        );

        const productItemIds = await Promise.all(
            orderItemIds.map(async (orderItemId) => {
                const orderItem = await CartItems.findById(orderItemId).populate({
                    path: 'products',
                    populate:{
                       path: 'productId',
                       select: 'price'
                    }
                });
                const productIds = orderItem.products.map(product => product.productId);
                const quantities = orderItem.products.map(product => product.quantity);
                return { productIds, quantities };
            })
        );

        const totalPrices = await Promise.all(
            productItemIds.map(async (productItem) => {
                let totalPrice = 0;
                for (let i = 0; i < productItem.productIds.length; i++) {
                    const product = await Product.findById(productItem.productIds[i]);
                    const quantity = productItem.quantities[i];
                    totalPrice += (product.price * quantity);
                }
                return totalPrice;
            })
        );

        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

        const getOrder = await Order.findOneAndUpdate({ _id: req.params.id },
            {

                user: req.body.user,
                products: req.body.products,
                amount: totalPrice,
                address: req.body.address,
            },
            { new: true });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const getOrder = await Order.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(getOrder);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};