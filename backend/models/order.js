const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        unique: true,
        ref: 'User'
    },
    
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true
    }],
    price: {
        type: Number,
        default: 0,
        required:true
    },
    quantity: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
        default: 0,
        required:true
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'pending'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)