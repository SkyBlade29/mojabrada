const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Product = require('./product.model');
let Category = new Schema({
    cat_name: {
        type: String
    }
});
module.exports = mongoose.model('Category', Category);