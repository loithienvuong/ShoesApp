const { string, boolean } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdersSchema = new Schema(
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
        quantity: {
            type: Number,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: false,
        },
        userId: {
            type: String,
            require: false,
        },
        userName: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: false,
        },
        address: {
            type: String,
            require: true,
        },
        orderStatus: {
            type: Number,
            require: true,
        }

    },

    { timestamps: true }
);

const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;