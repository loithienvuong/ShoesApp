const express = require('express')
const route = express.Router()
const app = express()
const { allowCrossDomain } = require('../utils/corsMiddleware')
const orderValidation = require('../helpers/orderValidation')

const ordersController = require('../controllers/orders')


app.use(allowCrossDomain)

route.get('/api/orders/addOrderProduct', ordersController.addOrderProduct)
route.post('/api/orders/createOrders', orderValidation , ordersController.createOrder)
route.get('/api/orders/getAllOrders', ordersController.getAllOrder)
route.get('/api/orders/getOrderById/', ordersController.getOrderById)
route.delete('/api/orders/deleteOrderById/', ordersController.deleteOrderById)
route.patch('/api/orders/editOrder/', ordersController.editOrder)

module.exports = route