const express = require('express')

// controller functions
const { insertPost,  
        getAll,
        getAllInCategory,
        getUserPosts,
        getPost
        } = require('../controllers/postController')

const router = express.Router()


// signup route
router.post('/insert', insertPost)
router.get('/user/:user', getUserPosts)
router.get('/single/:postid', getPost)
router.get('/getall', getAll)
router.get('/category/:category', getAllInCategory)


module.exports = router