const express = require('express')
const cors = require('cors')
const route = express.Router()
const app = express()

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const ProductsController = require('../controllers/products')

app.use(cors({ origin: '*', credentials: true }))
app.use(allowCrossDomain)

route.post('/api/products/create', ProductsController.createProduct)
route.get('/api/products/getAllProducts', ProductsController.getAllProducts)
route.get('/api/products/getProductById/', ProductsController.getProductById)
route.delete('/api/products/deleteProductById/', ProductsController.deleteProductById)
route.patch('/api/products/editProduct/', ProductsController.editProduct)

module.exports = route

// prefix

// git checkout -b feature/ sprint-01-task-111-handle