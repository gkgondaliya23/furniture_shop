const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String, 
        required:true, 
        unique:true
    },
    desc: {
        type: String, 
        required:true
    },
     price: { 
        type: Number, 
        required: true 
    },
    image: [{
        type: String, 
        required:true
    }],
    rating: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: Array, 
        required: true 
    }
  });

productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

productSchema.set("toJSON", {
    virtuals: true,
});


module.exports = mongoose.model('Product', productSchema);