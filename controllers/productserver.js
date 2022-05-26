
const express = require('express');
const router = express.Router();
const product = require('../models/products.js');
const productSeed = require('../models/productSeed.js');
// seed
router.get('/seed', (req,res) => {
    product.deleteMany({}, (error, allProducts) => {});
    product.create(productSeed, (error,data) => {
        res.redirect('/products');
    });
});

// I

router.get('/', (req,res) => {
    product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });

    });
});

// N
router.get("/new", (req,res) => {
    res.render('new.ejs');
});


// D
router.delete('/:id', (req,res) => {
    product.findByIdAndDelete(req.params.id, (err,data) => {
        res.redirect('/products');
    });
})


// U
router.put("/:id", (req, res) => {
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
router.post('/', (req,res) => {
    product.create(req.body, (error,createdProduct) => {
        res.redirect('/products');
    });
})


// E
router.get('/:id/edit', (req,res) => {
    product.findById(req.params.id, (error,foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});


// S
router.get('/:id', (req,res) => {
    product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

// Buy
router.put('/:id', (req,res) => {
    product.findByIdAndUpdate(
        req.params.id, (err, foundProduct) => {
            foundProduct.qty--;
            res.redirect('/products');
        }
    )
})
module.exports = router;