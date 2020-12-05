const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Product = new Schema({
    prod_img: {
        type: String
    },
    prod_name: {
        type: String
    },
    prod_desc: {
        type: String
    },
    prod_price: {
        type: Number
    },
    prod_disc: {
        type: Number
    }
});
module.exports = mongoose.model('Product', Product);