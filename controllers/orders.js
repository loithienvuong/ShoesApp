const Orders = require('../models/orders')
const Products = require('../models/products')
const Users = require('../models/users')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const errorFunction = require('../utils/errorFunction');
// const orderValidation = require('../helpers/orderValidation');


//CREATE

const createOrder = async (req, res, next) => {
    const productId = await Products.findById(req.body.productId)
    const userId = await Users.findById(req.body.userId)
    if (!productId) {
      return res.json(
        errorFunction(true, 204, 'This product Id have not in the database'),
      )
    }
    if (!userId) {
      return res.json(
        errorFunction(true, 204, 'This user Id have not in the database'),
      )
    }
    try {
        const order = await Orders(req.body)
        order.save().then((response) => {
            res.json({
                message: 'Added order successfully!', order
            })
        })
    } catch (error) {
        console.log('ERRORS:', error);
        res.status(400).json({
            statusCode: 400,
            errorMessage: error.details[0].message,
        })
    }
}


// ADD ORDER AND CHECK IN STOCK
const addOrderProduct = async (req, res, next) => {
    try {
        const quantity = req.body.quantity
        const user = await Users.findById(req.body.userId)
        const product = await Products.findById(req.body.productId)
        const requestProduct = { quantity: product.quantity - quantity}
        if (!user) {
          return res.json(
            errorFunction(true, 204, 'This user Id have not in the database'),
          )
        }
        else if (!product) {
            return res.json(
              errorFunction(true, 204, 'This product Id have not in the database'),
            )
        } else {
            if(quantity <= product.quantity){
                // Add order
                const newOrder = await Orders.create(req.body)
                if(newOrder){
                    // Update product
                    Products.findByIdAndUpdate(req.body.productId, requestProduct).then(
                        (data) => {
                            if(data){
                                res.status(201)
                                return res.json(
                                    errorFunction(false, 201, 'Order Created', newOrder)
                                )
                            } else{
                                return res.json(errorFunction(true, 400, 'Bad request'))
                            }
                        },
                    )
                } else {
                    res.status(403)
                    return res.json(errorFunction(true, 403, 'Error Creating Order'))
                } 
            } else {
                // Show message
                return res.json(errorFunction(true, 206, 'The quantity is greater than quantity in the stock'))
            }
        }

    } catch (error) {
        res.json(400)
        return res.json(errorFunction(true, 400, 'Bad request'))
    }

}


//READ - GET || POST
//get all orders
const getAllOrder = async (req, res, next) => {
    try {
        const allOrders = await Orders.find()
        if (allOrders.length > 0) {
            res.status(200).json({
                statusCode: 200,
                total: allOrders.length,
                orders: allOrders.reverse(),
            })
        } else {
            res.json(errorFunction(true, 204, 'No results'))
        }
    } catch (error) {
        console.log('error', error)

        res.status(400).json({
            statusCode: 400,
            message: 'Bad request',
        })
    }
}

// get by id
const getOrderById = async (req, res, next) => {
    const orderId = req.query.orderId;
    try {
        const order = await Orders.findById(orderId)
        if (order) {
            res.status(200).json({
                statusCode: 200,
                order,
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This order Id have not in the database',
                orders: {},
            })
        }
    } catch (error) {
        console.log('error', error)
        res.status(400).json({
            statusCode: 400,
            message: 'Bad request',
        })
    }
}


//UPDATE - PUT || PATCH
const editOrder = (req, res, next) => {
    try {
        const orderId = req.query.orderId;
        const isBodyEmpty = Object.keys(req.body).length;
        if (isBodyEmpty === 0) {
            return res.send({
                statusCode: 403,
                message: 'Body request can not empty',
            })
        }
        Orders.findByIdAndUpdate(orderId, req.body).then((data) => {
            if (data) {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Updated order successfully',
                })
            } else {
                res.json({
                    statusCode: 204,
                    message: 'This order Id have not in the database ',
                })
            }
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).json({
            statusCode: 400,
            message: 'Bad request',
        })
    }
}

//DELETE - DELETE
const deleteOrderById = async (req, res, next) => {
    const orderId = req.query.orderId;
    try {
        const order = await Orders.findByIdAndRemove(orderId)
        if (order) {
            res.status(200).json({
                statusCode: 200,
                message: 'Deleted order successfully',
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This order Id have not in the database',
            })
        }
    } catch (error) {
        console.log('error', error)
        res.status(400).json({
            statusCode: 400,
            message: 'Bad request',
        })
    }
}

module.exports = { addOrderProduct, createOrder, getAllOrder, getOrderById, editOrder, deleteOrderById, }