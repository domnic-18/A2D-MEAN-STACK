
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required: true
  }
});

const Product= module.exports = mongoose.model('products', productSchema);


