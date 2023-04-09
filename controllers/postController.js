const Posts = require('../models/postModel')
const multer = require('multer');

// Configure Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const insertPost = async (req, res) => {

  console.log("req1")
  console.log(req)
  upload.single('image')(req, res, async (err) => {
    if (err) {
      // Handle upload error
      return res.status(400).json({ error: 'Error uploading file' });
    }


    const { postid, name, category, price, user, userphonenumber, location, quantity } = req.body;

    if (!req.file) {
      // Handle missing file error
      return res.status(400).json({ error: 'Missing file' });
    }

    const imageBuffer = req.file.buffer;
    const image = imageBuffer.toString('base64');

    try {
      const dataObj = await Posts.insert(postid, name, image, category, price, user, location, userphonenumber, quantity)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  });
}




const getAll = async (req, res) => {
 
  try {
    const dataObj = await Posts.getAll()

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUserPosts = async (req, res) => {
  const { user } = req.params;

  try {
    const dataObj = await Posts.getUserPosts(user)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getPost = async (req, res) => {
  const { postid } = req.params;

  try {
    const dataObj = await Posts.getPost(postid)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



const getAllInCategory = async (req, res) => {
   const {category} = req.params
   
   try {
    const dataObj = await Posts.getAllInCategory(category)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}




module.exports = { 
                  insertPost,  
                  getAll, 
                  getAllInCategory,
                  getUserPosts,
                  getPost       
                }