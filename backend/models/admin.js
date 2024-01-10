const mongoose = require('mongoose');

const admin = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    pass:{
        type:String,
        required:true
    }
});

const Admin = module.exports = mongoose.model('admins', admin);
