const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')


router.get('/', (req, res, next) => {
    Order.find()
        .select('quantity product _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                orders: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then()
        .catch(err => {
            res.status(500).json({
                message: "product with that id isn't there",
                error: err
            })
        })
    const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('quantity product _id')
        // .excec()
        .then(result => {
            res.status(200).json({
                order: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})



router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Updated the oredr",
    })
})


router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "deleted the order",
    })
})



module.exports = router; 
