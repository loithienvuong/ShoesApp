const Users = require('../models/users')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const errorFunction = require('../utils/errorFunction')
const securePassword = require('../utils/securePassword')


//REGI
const addUser = async (req, res, next) => {
    try {
        const existingEmail = await Users.findOne({
            email: req.body.email,
        }).lean(true)
        const existingUsername = await Users.findOne({
            username: req.body.username,
        }).lean(true)
        if (existingEmail || existingUsername) {
            res.status(403)
            return res.json(errorFunction(true, 403, 'User Already Exists'))
        } else {
            const hashedPassword = await securePassword(req.body.password)
            const newUser = await Users.create({
                username: req.body.username,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                avatar: req.body.avatar,
                isAdmin: req.body.isAdmin,
            })
            if(newUser) {
                res.status(201)
                return res.json(errorFunction(false, 201, 'User Created', newUser))
            } else {
                res.status(403)
                return res.json(errorFunction(true, 403, 'Error Creating User'))
            }
        }
    } catch (error) {
        res.status(400)
        console.log(error)
        return res.json(errorFunction(true, 400, 'Error Adding User'))
    }
}

//LOGIN
const login = (req, res, next) => {
    try {
      var username = req.body.username
      var password = req.body.password
      // username = 'admin'
      Users.findOne({ username: username }).then(
        // Users.findOne({ $or: [{ email: username }, { phone: username }] }).then(
        (user) => {
          if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                res.json(errorFunction(true, 400, 'Bad Request'))
              }
              if (result) {
                let access_token = jwt.sign({ username: user.username,  }, "secretValue", {
                  expiresIn: "1h",
                });
                res.json({
                  message: 'Login Successfully!',
                  access_token,
                  userId: user._id,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  isAdmin: user.isAdmin,
                  phone: user.phone,
                  address: user.address,
                  avatar: user.avatar,
                })
              } else {
                res.json(errorFunction(true, 400, 'Password does not matched!'))
              }
            })
          } else {
            res.json(errorFunction(true, 400, 'No user found!'))
          }
        },
      )
    } catch (error) {
      res.json(errorFunction(true, 400, 'Bad Request'))
    }
}


//READ - GET || POST
//get all products
const getAllUser = async (req, res, next) => {
    try {
        const allUser = await Users.find()
        if (allUser.length > 0){
            res.status(200).json({
                statusCode: 200,
                users : allUser.reverse(),
            })
        } else {
            res.status(204).json({
                statusCode: 204,
                message: 'No results',
                users: [],
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

// get by id
const getUserById = async (req, res, next) => {
    const userId = req.query.userId;
    try {
        const user = await Users.findById(userId)
        if (user){
            res.status(200).json({
                statusCode: 200,
                user,
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This user Id have not in the database',
                users: {},
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
const editUser = (req, res, next) => {
    try {
        const userId = req.query.userId;
        const isBodyEmpty = Object.keys(req.body).length;
        if (isBodyEmpty === 0) {
            return res.send({
                statusCode: 403,
                message: 'Body request can not empty',
            })
        }
        Users.findByIdAndUpdate(userId, req.body).then((data) => {
            if (data) {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Updated user successfully',
                })
            } else {
                res.json({
                    statusCode: 204,
                    message: 'This user Id have not in the database ',
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
const deleteUserById = async (req, res, next) => {
    const userId = req.query.userId;
    try {
        const user = await Users.findByIdAndRemove(userId)
        if (user){
            res.status(200).json({
                statusCode: 200,
                message: 'Deleted user successfully',
            })
        } else {
            res.json({
                statusCode: 204,
                message: 'This user Id have not in the database',
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

module.exports = { addUser, deleteUserById, editUser, getAllUser, getUserById, login }