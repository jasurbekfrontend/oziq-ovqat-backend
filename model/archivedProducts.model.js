const mongoose = require('mongoose');

const ArchivedProductsModel = new mongoose.Schema({
    sold_date: { type: Date, required: true },
    total_price: { type: Number, required: true },
    sold_products: { type: Array, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ArchivedProduct', ArchivedProductsModel);