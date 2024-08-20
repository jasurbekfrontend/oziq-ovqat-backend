const mongoose = require('mongoose');

const ArchivedProductModel = new mongoose.Schema({
    product_id: { type: String, required: true },
    sold_quantity: { type: Number, required: true },
    sold_date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ArchivedProduct', ArchivedProductModel);