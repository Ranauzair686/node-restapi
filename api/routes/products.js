const express = require ('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require ('mongoose')


router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'handling the get '
    })
})


router.post('/', (req, res, next)=>{
    const newProduct = new Product({
        // _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    newProduct.save()
    res.status(201).json({
        message : 'product created successfully',
        // createdProduct : product
    })
})


router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if (id == 'special'){
        res.status(200).json({
            message : "you got the id",
            id : id
        })
    } else {
        res.status(400).json({
            message : "bad request"
        })
    }
    
})



router.patch('/:productId', (req, res, next) =>{ 
        res.status(200).json({
            message : "Updated the product",
        })
})


router.delete('/:productId', (req, res, next) =>{ 
    res.status(200).json({
        message : "deleted the product",
    })
})

module.exports = router