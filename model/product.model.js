const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    buy_price: {
        type: Number,
        required: true,
    },
    sell_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    olcham: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('Product', ProductSchema);
