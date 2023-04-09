const express = require('express')

// controller functions
const { loginAdmin } = require('../controllers/adminController')

const router = express.Router()


router.post('/login', loginAdmin)

module.exports = router