const mongoose = require ('mongoose')


const orderSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('Order', orderSchema)