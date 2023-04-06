const Product = require('../model/product');
const User = require('../model/user');
const CartItems = require('../model/cart');


exports.creatCart = async (req, res) => {
  try {

    // Check if user exists
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newCart = await CartItems(req.body);
    await newCart.save();

    const { id, products } = newCart;
    res.status(201).json({ cart_id: id, user_id: user.id, products, message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getAllCart = async (req, res) => {
  try {

    const getAllOrder = await CartItems.find();
    res.status(200).json(getAllOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const getOrder = await CartItems.find({ user: user });

    res.status(200).json(getOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateCart = async (req, res) =>{
  try {
    const { cartItemId } = req.params;

    // Check if user exists
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find index of cart item to remove
    const cartIndex = await CartItems.findById(cartItemId);
    if (!cartIndex) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const updatecart = await CartItems.findOneAndUpdate({_id: cartItemId},
      {
        $set: req.body,
      },
      { new: true });

      await updatecart.save();
    res.json({ updatecart, message: 'Cart item updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.removeCart = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find index of cart item to remove
    const cartIndex = await CartItems.findById(cartItemId);
    if (!cartIndex) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const remveCart = await CartItems.findByIdAndDelete(cartItemId);


    res.json({ remveCart, message: 'Cart item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
