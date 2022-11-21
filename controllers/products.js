const Products = require('../models/products')
const ProductValidation = require('../helpers/validation')
//CRUD
//CREATE - POST
const createProduct = async (req, res, next) => {
    try {
        // const {
        //     productName,
        //     productBrand,
        //     type,
        //     info,
        //     price,
        //     discount,
        //     quantity,
        //     images
        // } = req.body;
        // if (
        //     !productName ||
        //     !productBrand ||
        //     !type ||
        //     !info ||
        //     !price ||
        //     !discount ||
        //     !quantity ||
        //     !images
        // ) {
        //     res.status(400).json({
        //         statusCode: 400,
        //         message: 'Some fields are not empty',
        //     })
        // }
        const validReq = await ProductValidation.addProductSchema.validateAsync(req.body)
        // let product = new Products(req.body);
        let product = new Products(validReq)
        // product.save();
        product.save().then((response) => {
            res.json({
                message: 'Added product successfully!',
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
const getAllProducts = async (req, res, next) => {
    try {
        const {
            pageSize = 12,
            pageNumber = 1,
            productName = "",
            productBrand = "",
            orderByColumn,
            orderByDirection = "desc",
        } = req.query;

        const filter = {
            $and: [
                {
                    productName: {
                        $regex: productName,
                        $options: "$i",
                    },
                },
                {
                    productBrand: {
                        $regex: productBrand,
                        $options: "$i",
                    },
                },
            ],
        };

        const filterProducts = await Products.find(filter)
            .sort(`${orderByDirection === 'asc' ? "" : "-"}${orderByColumn}`)
            .limit(pageSize * 1)
            .skip((pageNumber - 1) * pageSize);

        const allProducts = await Products.find(filter);

        let totalPage = Math.ceil(allProducts.length / pageSize);
        if (filterProducts.length > 0) {
            res.status(200).json({
                totalPage,
                totalProducts: allProducts.length,
                products:
                    orderByColumn && orderByDirection
                        ? filterProducts
                        : filterProducts.reverse(),
            });
        } else {
            res.status(200).json({
                message: "No results",
                products: [],
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
        });
    }
}

// get by id
const getProductById = async (req, res, next) => {
    const productId = req.query.productId;
    try {
        const product = await Products.findById(productId)
        if (product) {
            res.status(200).json({
                statusCode: 200,
                product,
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This product Id have not in the database',
                products: {},
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
const editProduct = (req, res, next) => {
    try {
        const productId = req.query.productId;
        const isBodyEmpty = Object.keys(req.body).length;
        if (isBodyEmpty === 0) {
            return res.send({
                statusCode: 403,
                message: 'Body request can not empty',
            })
        }
        Products.findByIdAndUpdate(productId, req.body).then((data) => {
            if (data) {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Updated product successfully',
                })
            } else {
                res.json({
                    statusCode: 204,
                    message: 'This product Id have not in the database ',
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
const deleteProductById = async (req, res, next) => {
    const productId = req.query.productId;
    try {
        const product = await Products.findByIdAndRemove(productId)
        if (product) {
            res.status(200).json({
                statusCode: 200,
                message: 'Deleted product successfully',
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This product Id have not in the database',
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


module.exports = { createProduct, getAllProducts, getProductById, deleteProductById, editProduct }