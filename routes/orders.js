const express = require('express')

// controller functions
const { insertOrder,  
        getAll,
        getAllInCategory,
        getUserOrders,
        getOrder
        } = require('../controllers/orderController')

const router = express.Router()


// signup route
router.post('/insert', insertOrder)
router.get('/user/:user', getUserOrders)
router.get('/single/:orderid', getOrder)
router.get('/getall', getAll)
router.get('/category/:category', getAllInCategory)


module.exports = router