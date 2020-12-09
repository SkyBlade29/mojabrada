const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Product = require('./product.model');
let Category = new Schema({
    cat_name: String,
    products: [
            {
                type: Schema.Types.ObjectId, ref: 'Product'
            }
            ]
});
module.exports = mongoose.model('Category', Category);