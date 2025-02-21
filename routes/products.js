const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')


router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count : docs.length,
                products : docs
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'product created successfully',
                product: {
                    _id : result._id,
                    name : result.name,
                    price : result.price
                }
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
        .select('name price _id')
        .exec()
        .then(doc => {
            res.status(200).json({
                product : doc
            })
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
            res.status(200).json({ 
                message : "Updated successfully" 
            })
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
            res.status(200).json({
               mesasge : "deleted succesfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router