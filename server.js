const express = require('express');
const app = express();
require('dotenv').config({});
const mongoose = require('mongoose');
const product = require('./models/products')
const productSeed = require('./models/productSeed.js');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.urlencoded({ extended: true }));

app.get('/seed', (req,res) => {
    product.deleteMany({}, (error, allProducts) => {});
    product.create(productSeed, (error,data) => {
        res.redirect('/products');
    });
});

// I

app.get('/products', (req,res) => {
    product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });

    });
});

// N



// D



// U



// C



// E



// S



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
});