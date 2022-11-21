const Joi = require("joi");
const errorFunction = require('../utils/errorFunction')

// const patternPassword = /^[a-zA-Z0-9]{5,30}$/
const patternPhoneNumber = /[0]{1}[0-9]{9}/

const validation = Joi.object({
    productId: Joi.string().required(),
    productName: Joi.string().min(5).max(30).required(),
    productBrand: Joi.string().min(5).max(30).required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    type: Joi.string().max(100).required(),
    images: Joi.string().allow(""),
    userId: Joi.string().required(),
    userName: Joi.string().min(5).max(30).required(),
    phone: Joi.string().length(10).pattern(new RegExp(patternPhoneNumber)).required(),
    address: Joi.string().min(10).max(200).required().allow(""), 
    orderStatus: Joi.number().required(),
})

const orderValidation = async (req, res, next) => {
    const payload = {
        productId: req.body.productId,
        productName: req.body.productName,
        productBrand: req.body.productBrand,
        quantity: req.body.quantity,
        price: req.body.price,
        type: req.body.type,
        images: req.body.images,
        userId: req.body.userId,
        userName: req.body.userName,
        phone: req.body.phone,
        address: req.body.address,
        orderStatus: req.body.orderStatus,
    }

    const { error } = validation.validate(req.body)
    if (error) {
        res.status(406)
        return res.json(
            errorFunction(true, `Error in User Data: ${error.message}`),
        )
    } else {
        next()
    }
}
module.exports = orderValidation

