const mongoose = require('mongoose')
const Product = new mongoose.Schema({
    barcode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["live", "artificial", "combined"],
        default: "live"
    }
    ,
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model('Product', Product)