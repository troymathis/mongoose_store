const express = require('express');
const app = express();
require('dotenv').config({});
const mongoose = require('mongoose');
const product = require('./models/products')
const productSeed = require('./models/productSeed.js');
const methodOverride = require('method-override');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

// seed
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
app.get("/products/new", (req,res) => {
    res.render('new.ejs');
});


// D
app.delete('/products/:id', (req,res) => {
    product.findByIdAndDelete(req.params.id, (err,data) => {
        res.redirect('/products');
    });
})


// U
app.put("/products/:id", (req, res) => {
    product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`)
      }
    )
  })


// C
app.post('/products', (req,res) => {
    product.create(req.body, (error,createdProduct) => {
        res.redirect('/products');
    });
})


// E
app.get('/products/:id/edit', (req,res) => {
    product.findById(req.params.id, (error,foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});


// S
app.get('/products/:id', (req,res) => {
    product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

// Buy
app.put('/products/:id', (req,res) => {
    product.findByIdAndUpdate(
        req.params.id, (err, foundProduct) => {
            foundProduct.qty--;
            res.redirect('/products');
        }
    )
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
});