const express = require ('express')
const router = express.Router()


router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'handling the get for orders'
    })
})


router.post('/', (req, res, next)=>{
    const order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : 'handling the post for order',
        order : order
    })
})


router.get('/:orderId', (req, res, next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message : "get for single order"
    })
    
})



router.patch('/:orderId', (req, res, next)=>{ 
        res.status(200).json({
            message : "Updated the oredr",
        })
})


router.delete('/:orderId', (req, res, next)=>{ 
    res.status(200).json({
        message : "deleted the order",
    })
})



module.exports = router; 
