const Joi = require("joi");
const errorFunction = require('../utils/errorFunction')

// const patternPassword = /^[a-zA-Z0-9]{5,30}$/
const patternPhoneNumber = /[0]{1}[0-9]{9}/

const validation = Joi.object({
    productId: Joi.string().required(),
    productName: Joi.string().min(5).max(30).required(),
    productBrand: Joi.string().min(5).max(30).required(),
    price: Joi.number().required(),
    images: Joi.string().allow(""),
    quantity: Joi.number().required(),
    type: Joi.string().max(100).required(),
    userId: Joi.string().required(),
})

const cartValidation = async (req, res, next) => {
    const payload = {
        productId: req.body.productId,
        productName: req.body.productName,
        productBrand: req.body.productBrand,
        price: req.body.price,
        images: req.body.images,
        quantity: req.body.quantity,
        type: req.body.type,
        userId: req.body.userId,
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
module.exports = cartValidation

