const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let Product = require('./product.model');
let Category = require('./category.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });
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

prodRoutes.route('/').get(function(req, res){
    Product.find(function(err, products){
        if(err){
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

catRoutes.route('/').get(function(req,res){
    Category.find(function(err, categories){
        if(err){
            console.log(err);
        } else {
            res.json(categories);
        }
    })
});

catRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Category.findById(id, function(err, category){
        res.json(category)
    })
});

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

prodRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        res.json(product);
    });
});

prodRoutes.route('/add').post(function(req,res){
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product':'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
});

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