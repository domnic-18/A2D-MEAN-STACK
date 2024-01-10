const mongoose = require('mongoose');

const customer = mongoose.Schema({
    _id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required: true
    },
    pass:{
        type:String,
        required:true
    }
});

const Customer = module.exports = mongoose.model('customers', customer);

