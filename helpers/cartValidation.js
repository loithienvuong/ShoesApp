const Joi = require("joi");
const errorFunction = require('../utils/errorFunction')


const validation = Joi.object({
    productId: Joi.string().required(),
    productName: Joi.string().min(5).max(30).required(),
    productBrand: Joi.string().min(5).max(30).required(),
    quantity: Joi.number().required(),
    type: Joi.string().max(100).required(),
    price: Joi.number().required(),
    images: Joi.string().allow(""),
    userId: Joi.string().required(),
})

const cartValidation = async (req, res, next) => {

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