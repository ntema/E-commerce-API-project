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
        default: 200,
        required:true
    },
    address:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)