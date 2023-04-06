const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
})

cartItemSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
cartItemSchema.set("toJSON", {
    virtuals: true,
  });

  
module.exports = mongoose.model('CartItems', cartItemSchema);