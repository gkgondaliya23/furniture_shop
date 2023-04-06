const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model('Order', orderSchema);