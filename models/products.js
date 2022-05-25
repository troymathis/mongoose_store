const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    img: String,
    price: {type: Number, required: Number > 0},
    qty: {type: Number, required: Number > 0}
});

const product = mongoose.model('product', productSchema);

module.exports = product;