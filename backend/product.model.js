const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Product = new Schema({
    prod_img_path: {
        type: String
    },
    prod_img_mimetypes: {
        type: String
    },
    prod_name: {
        type: String,
        trim: true
    },
    prod_desc: {
        type: String,
        trim: true
    },
    prod_price: {
        type: Number
    },
    prod_disc: {
        type: Number
    }
});
module.exports = mongoose.model('Product', Product);