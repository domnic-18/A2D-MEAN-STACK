var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
const Product = require('./models/product');
const customer = require('./models/customer');
var cors = require('cors');
mongoose.connect('mongodb://127.0.0.1:27017/a2d');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('connected', ()=>{
	console.log("connection succeeded");
});
const route= require('./router/route');
const product = require("./models/product");
var app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api',route);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post("/sign_up",async function(req,res){
	console.log("received");
	var name = req.body.name;
	var pass = req.body.pass;
	var data = {
		"name": name,
		"pass":pass,
	}
	console.log("new "+name);
	db.collection('customers').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Customer inserted Successfully");

	});
})


app.post("/updateproduct",async function(req,res){
	console.log("requested product Updation");

});


app.get('/',function(req,res){
	res.set({
		'Access-control-Allow-Origin': '*'
	});
}
);
app.listen(5555,()=>{
	console.log("server listening at port 5555");
});
