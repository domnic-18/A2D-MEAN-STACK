const mongoose = require('mongoose');

const Transaction = mongoose.Schema({
    _id:{
        type:Number
    },
    name:{
        type:String
    },
    amount:{
        type:Number
    },
    cardno:{
        type:String
    },
    edate:{
        type:String
    },
    cvv:{
        type:String
    }
});

const Payment = module.exports = mongoose.model('Payment', Transaction);
