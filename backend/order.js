
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  odate: Date,
  grandtotal: Number,
  custid: String,
  orderList: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
