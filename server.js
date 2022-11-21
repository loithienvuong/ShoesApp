const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ProductsRoute = require('./routes/products')
const UsersRoute = require('./routes/users')
const OrdersRoute = require('./routes/orders')
const CartsRoute = require('./routes/carts')
require('dotenv').config()
// const test = process.env.TEST

const connection_string = process.env.CONNECTION_STRING

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const database = mongoose.connection

const app = express()

app.use(express.json())

const PORT = 5000

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`)
    // console.log('test', test)
})

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('', ProductsRoute)
app.use('', UsersRoute)
app.use('', OrdersRoute)
app.use('', CartsRoute)

