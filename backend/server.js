const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const PORT = 4000;
const multer = require('multer');

let Product = require('./product.model');
let Category = require('./category.model');

app.use('/files', express.static(__dirname+'/files'));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const prodRoutes = express.Router();
const catRoutes = express.Router();
app.use('/products', prodRoutes);
app.use('/categories', catRoutes);

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, path.join(__dirname,'/files'));
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); // continue with upload
    }
});

// All Products
prodRoutes.route('/').get(function(req, res){
    Product.find(function(err, products){
        if(err){
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// All Categories
catRoutes.route('/').get(function(req,res){
    Category.find(function(err, categories){
        if(err){
            console.log(err);
        } else {
            res.json(categories);
        }
    })
});

// Filter by Category
catRoutes.route('/:cat_name').get(function(req,res){
    let cat_name = req.params.cat_name;
    Category.findOne({cat_name: cat_name},async function(err, category){
        let product = await Product.find({ _id : { $in: category.products }});
        res.json(product);
    })
});

// Add Category
catRoutes.route('/add').post(function(req,res){
    let category = new Category(req.body);
    category.save()
        .then(category => {
            res.status(200).json({'category':'Category successfully added'})
        })
        .catch(err => {
            res.status(400).send('Adding a new category failed')
        })
});

// Update category
catRoutes.route('/update/:cat_name').post(async function(req, res){
   let category = await Category.findOneAndUpdate({cat_name: req.params.cat_name},{$set: req.body})
       .then( category => {
           res.status(200).json({'status': 'category updated successfully'});
       } )
       .catch( err => {
           res.status(400).send('category update failed'+err);
       });
});

// Specific Product
prodRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        res.json(product);
    });
});

// Add product
prodRoutes.route('/add').post(upload.single('file'),async (req,res) => {
    let category = await Category.findOne({cat_name: req.query.cat_name});
    console.log(category);
    const { img_path, img_mimetypes } = req.file;
    console.log(req.file);
    console.log({ img_path, img_mimetypes});
    let product = new Product({
        prod_img_path: ("http://localhost:4000/files/"+req.file.filename),
        prod_img_mimetypes: req.file.mimetype,
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price: req.body.prod_price,
        prod_disc: req.body.prod_disc
    });
    console.log(product);
    category.products.push(product);
    await category.save()
        .then(category => {
            console.log({'product':'Category updated successfully'});
        })
        .catch(err => {
            res.status(400).send('updating category failed');
        });
    await product.save()
        .then(product => {
            res.status(200).json({'product':'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

// Update Product
prodRoutes.route('/update/:id').post(function (req,res) {
    Product.findById(req.params.id, function (err, product) {
        if(!product){
            res.status(400).send('product not found');
        } else {
            product.prod_name = req.params.prod_name;
            product.prod_desc = req.params.prod_desc;
            product.prod_price = req.params.prod_price;
            product.prod_disc = req.params.prod_disc;

            product.save().then(product => {
                res.json('Product updated!');
            })
                .catch(err => {
                    res.status(400).send('Update failed!');
                });
        }
    });
});