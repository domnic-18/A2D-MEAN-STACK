
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  odate: String,
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
