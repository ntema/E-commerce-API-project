const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        unique
    },
    desc : {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["fashion", "shoes", "babies", "babies things"],
        required: true
    },
    price: {
        type: number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    catSlug: {
        type:String,
    },
    catSlug: {
        type:String,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)