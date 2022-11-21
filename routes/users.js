const express = require('express')
const route = express.Router()
const app = express()
const { allowCrossDomain } = require('../utils/corsMiddleware')
const userValidation = require('../helpers/userValidation')

const usersController = require('../controllers/users')


app.use(allowCrossDomain)

route.post('/api/auths/register', userValidation, usersController.addUser)
route.post('/api/auths/login', usersController.login)
route.get('/api/users/getAllUsers', usersController.getAllUser)
route.get('/api/users/getUserById/', usersController.getUserById)
route.delete('/api/users/deleteUserById/', usersController.deleteUserById)
route.patch('/api/users/editUser/', usersController.editUser)

module.exports = route