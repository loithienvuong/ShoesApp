const Carts = require('../models/carts')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const errorFunction = require('../utils/errorFunction')


const createCart = async (req, res, next) => {
    const cartId = await Carts.findById(req.body.cartId)
    const userId = await Users.findById(req.body.userId)
    if (!cartId) {
      return res.json(
        errorFunction(true, 204, 'This cart Id have not in the database'),
      )
    }
    if (!userId) {
      return res.json(
        errorFunction(true, 204, 'This user Id have not in the database'),
      )
    }
    try {
        const cart = await Carts(req.body)
        cart.save().then((response) => {
            res.json({
                message: 'Added cart successfully!', order
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

//READ - GET || POST
//get all products
const getAllCart = async (req, res, next) => {
    try {
        const allCart = await Carts.find()
        if (allCart.length > 0){
            res.status(200).json({
                statusCode: 200,
                carts : allCart.reverse(),
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
const getCartById = async (req, res, next) => {
    const cartId = req.query.cartId;
    try {
        const cart = await Carts.findById(cartId)
        if (cart){
            res.status(200).json({
                statusCode: 200,
                cart,
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This cart Id have not in the database',
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
const editCart = (req, res, next) => {
    try {
        const cartId = req.query.cartId;
        const isBodyEmpty = Object.keys(req.body).length;
        if (isBodyEmpty === 0) {
            return res.send({
                statusCode: 403,
                message: 'Body request can not empty',
            })
        }
        Carts.findByIdAndUpdate(cartId, req.body).then((data) => {
            if (data) {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Updated cart successfully',
                })
            } else {
                res.json({
                    statusCode: 204,
                    message: 'This cart Id have not in the database ',
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
const deleteCartById = async (req, res, next) => {
    const cartId = req.query.cartId;
    try {
        const cart = await Carts.findByIdAndRemove(cartId)
        if (cart){
            res.status(200).json({
                statusCode: 200,
                message: 'Deleted cart successfully',
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This cart Id have not in the database',
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

module.exports = { createCart, getAllCart, getCartById, editCart, deleteCartById, }