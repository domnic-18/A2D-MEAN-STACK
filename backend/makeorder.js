const express = require('express');
const mongoose = require('mongoose');
const Order = require('./order');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/hari', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.post('/api/orders', async (req, res) => {
  res.set({
		'Access-Control-Allow-Origin': '*',
	});
  console.log("Accepted orders");
  const order = new Order({
    odate: req.body.odate,
    grandtotal: req.body.grandtotal,
    custid: req.body.custid,
    orderList: req.body.orderList
  });
  console.log(order);
  try {
    await order.save();
    res.send(order);
  } catch (ex) {
    console.log(ex.message);
  }
});

app.get('/',function(req,res){
  res.set({
    'Access-control-Allow-Orgin':'*'
  });

}).listen(3000);