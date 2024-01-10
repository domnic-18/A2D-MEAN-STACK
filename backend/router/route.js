const express = require('express');
var router = express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product')
const Payment = require('../models/payment')
const Order = require('../models/order')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/a2d');
var db=mongoose.connection;
app=express();
router.post('/user_login',async (req,res,next) => {
	console.log("Request from webmaster");
    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const pass = req.body.pass;
		const name= req.body.name;
		const opass = await Customer.find({name:name});
		if(opass.length == 0){
			res.json({auth:'invalid'});
		}	
		else{
			console.log(opass[0]);
			if(pass==opass[0].pass){
				res.json({auth:'true',name:req.body.name,_id:opass[0]._id});
			}
			else{
				res.json({auth:'false'});
			}
		}
		
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.post("/sign_up",async function(req,res){
	var name = req.body.name;
	var pass = req.body.pass;
	var phonenumber = req.body.phonenumber;
	var street = req.body.street;
	var area = req.body.area;
	var state = req.body.state;
	var data = {
		"name": name,
		"pass":pass,
		"phonenumber":phonenumber,
		"state":state,
		"area":area,
		"street":street
	}
	console.log("new "+name);
	db.collection('customers').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Customer inserted Successfully");

	});
})
router.post("/productdelete",async function(req,res){
	res.set({
		'Access-Control-Allow-Origin':'*',
	});
  console.log("Delete requested");
	var fname=req.body.fname;
	var data = {
			"name": fname,
		}
	console.log(data);
	try{
		const result = await Product.deleteOne({name:fname});
		res.json({msg:'success'});
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
})
router.get("/products",async function(req,res,next){
	res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const products = await Product.find();
		console.log(products)
		res.json(products);
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});

router.get("/getorders",async function(req,res,next){
	res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const orders = await Order.find();
		res.json( orders);
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});

router.post('/listorders',async (req,res,next) => {
	console.log("Request from webmaster");
    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const custid = req.body.id;
		console.log(custid);
		const orders = await Order.find({custid:custid});	
		console.log(orders);
		if(orders.length == 0){
			console.log("Empty order list");
			res.json({msg:"empty order list"});
		}
		else{
			res.json({orders});
		}
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/addproduct",async function(req,res){
	console.log("requested product insertion");
	var name = req.body.name;
	var category = req.body.category;
	var description = req.body.desc;
	var price = req.body.price;
	var quantity = req.body.quantity;
	var imgurl =req.body.imgurl
	console.log(name+category+description+price+quantity+imgurl);
	var data = {
		"name": name,
		"category":category,
		"description":description,
		"price":price,
		"quantity":quantity,
		"imgurl":imgurl
	}
	//console.log("new "+data);
	db.collection('products').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Product inserted Successfully");

	});
})

router.post("/productups",async function(req,res){
	console.log("requested product update");
	res.set({
		'Access-Control-Allow-Origin':'*',
	});
	var name=req.body.name;
	var price=req.body.price;	

	console.log(name);
	db.collection("products").updateOne({name:req.body.name},{$set:{price:req.body.price}}, function(err, res) {
		if (err) throw err;
	  });
	  res.json({msg:"success"});
})



router.post("/order",async function(req,res){
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
})
 module.exports = router;
