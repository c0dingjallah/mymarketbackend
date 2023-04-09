const express = require('express')

// controller functions
const { signupUser, loginUser, getUser} = require('../controllers/userController')

const router = express.Router()


// signup route
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/get', getUser)

module.exports = router