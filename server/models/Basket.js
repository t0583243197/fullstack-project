const mongoose = require('mongoose')
const Basket = new mongoose.Schema({
     userId:{
       type:mongoose.Schema.Types.ObjectId, 
       required: true,
       ref:"User"
    },
      products: {
        type: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: []
    }
}, {
    timestamps: true
    })
 module.exports = mongoose.model('Basket', Basket)

    


