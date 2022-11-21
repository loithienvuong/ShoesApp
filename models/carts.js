const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartsSchema = new Schema(
    {
        productId: {
            type: String,
            require: true,
        },
        productName: {
            type: String,
            require: true,
        },
        productBrand: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        images: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        type: {
            type: String,
            require: false,
        },
        userId: {
            type: String,
            require: true,
        },
        
    },

    { timestamps: true }
);

const Carts = mongoose.model('Carts', CartsSchema);
module.exports = Carts;