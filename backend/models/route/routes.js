const express = require('express');
var router = express.Router();
const User = require('../models/user')
const Fundraiser = require('../models/fundraiser')
const Payment = require('../models/payment')
const Fund = require('../models/fund')
const Admin = require('../models/admin')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Charity');
var db=mongoose.connection;
app=express();
router.post('/donor_login',async (req,res,next) => {

    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
        let pass=req.body.pass;
		console.log("send "+pass);
		const opass = await User.find({email:req.body.email});
		console.log(opass);
		if(opass== new Object([]) ){
			res.json({auth:'false'});
		}
		else if(pass==opass[0].password){
			res.json({auth:'true',email:req.body.email});
		}
		// if(pass==opass[0].password){
		// 	res.json({auth:'true',email:req.body.email});
        // }
        // else{
        //     res.json({auth:'false'});
        // }
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.post('/admin_login',async (req,res,next) => {

    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
        let pass=req.body.pass;
		const opass = await Admin.find({email:req.body.email});
        console.log("password="+opass[0].password);
		if(pass==opass[0].password){
			res.json({auth:'true',email:req.body.email});
        }
        else{
            res.json({auth:'false'});
        }
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.post('/fundraiser_login',async (req,res,next) => {

    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
        let pass=req.body.pass;
		console.log(req.body.email);
		const opass = await Fundraiser.find({org_email:req.body.email});
        console.log(opass);
		if(pass==opass[0].password){
            res.json({auth:'true',email:req.body.email});
        }
        else{
            res.json({auth:'false'});
        }
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.get("/funds",async function(req,res,next){
	res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const funds = await Fund.find();
		res.json( funds);
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.get("/fundaraisers",async function(req,res,next){
	res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const funds = await Fundraiser.find();
		res.json( funds);
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.post('/donar_register',(req,res,next) => {
    let newuser= new User();
    User.find(function(err,data ){
        console.log(data.name);
        if(err) {
            res.json(err);
        }
        else{
            res.json(data);
        }
    });
});
router.post('/get_my_funds',async (req,res,next) => {
    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const result = await Fund.find({organisation:req.body.org});
        console.log(req.body.org);
		if (result) {
			res.json(result);
		 } else {
			res.json({'write proper code':"idiot"});
		 }
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});
router.delete('/del_funds',async(req,res,next)=>{

});
router.get('/get_all_transactions',async (req,res,next) => {

    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	try{
		const result = await Payment.find();
        console.log(result);
		if(result==[]){
            res.json({});
        }
        else{
            res.json(result);
        }
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});

router.post("/donor_sign_up",function(req,res){
    console.log("req received josh");
    res.set({
		'Access-Control-Allow-Origin':'*'
	});
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.pass;
	var phone =req.body.mobile_number;
	var dob = req.body.date;
	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
	console.log(name);
	db.collection('donors').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Donor Record inserted Successfully");

	});
})

router.post("/fundraiser_sign_up",function(req,res){
	var org_name = req.body.oname;
	var owner_name = req.body.owname;
	var org_email =req.body.oemail;
	var pass = req.body.pass;
	var phone =req.body.mobile_number;
	var reg_no=req.body.reg_number;
	var state=req.body.state;
	var city=req.body.City;
	var street=req.body.street;
	var area=req.body.area;
	console.log(org_name);
	var data = {
		"org_name":org_name,
		"owner_name":owner_name,
		"org_email":org_email,
		"password":pass,
		"phone":phone,
		"reg_no":reg_no,
		"state":state,
		"city":city,
		"street":street,
		"area":area
	}
	db.collection('fundraiser').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Fundraiser Record inserted Successfully");

	});
	//return res.redirect('signup_success.html');
})
module.exports = router;
