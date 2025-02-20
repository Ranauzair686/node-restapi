const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')


router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


router.post('/', (req, res, next) => {
    const product = new Product({
        // _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'product created successfully',
                createdProduct: result
            })
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({
                error: err
            })
        })

})


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            // console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})



router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops in req.body) {
        updateOps[ops] = req.body[ops]
    }
    Product.updateOne({ _id: id }, {
        $set: updateOps 
    })
        .exec()
        .then(result => {
            res.status(200).json({ result })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router