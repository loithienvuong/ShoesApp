const express = require('express')
const route = express.Router()
const app = express()
const { allowCrossDomain } = require('../utils/corsMiddleware')
const cartValidation = require('../helpers/cartValidation')

const cartsController = require('../controllers/carts')


app.use(allowCrossDomain)

route.post('/api/carts/createCarts', cartValidation, cartsController.createCart)
route.get('/api/carts/getAllCarts', cartsController.getAllCart)
route.get('/api/carts/getCartById/', cartsController.getCartById)
route.delete('/api/carts/deleteCartById/', cartsController.deleteCartById)
route.patch('/api/carts/editCart/', cartsController.editCart)

module.exports = route