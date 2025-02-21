const express = require ('express');
const morgan = require ('morgan');
const app = express();
const connectDB = require('./config/db')
const bodyParser = require('body-parser')  
const mongoose = require('mongoose')


const orderRoutes = require ('./routes/orders');
const productRoutes = require ('./routes/products');

// .then(result => console.log('connected'))


//this will tell which api is being hitted firtsly installed moragn library for this
app.use(morgan('dev'))
connectDB();

// for parsiong the body
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

// route to handle request s
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error:{
            message : error.message
        }
    })
})

 
module.exports = app;   