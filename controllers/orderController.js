const Orders = require('../models/orderModel')
const multer = require('multer');

// Configure Multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const insertOrder = async (req, res) => {

  // console.log("req1")
  // console.log(req)
  // upload.single('image')(req, res, async (err) => {
  //   if (err) {
  //     // Handle upload error
  //     return res.status(400).json({ error: 'Error uploading file' });
  //   }

    const { orderid, buyer, buyerphonenumber, buyerlocation, pickupoption, postid, name, image, category, price, quantity, seller, sellerphonenumber, sellerlocation } = req.body;

    console.log(orderid)
    console.log(buyer)
    console.log(buyer)
    console.log(buyerphonenumber)
    // if (!req.file) {
    //   // Handle missing file error
    //   return res.status(400).json({ error: 'Missing file' });
    // }

    // const imageBuffer = req.file.buffer;
    // const image = imageBuffer.toString('base64');

    try {
      const dataObj = await Orders.insert(orderid, buyer, buyerphonenumber, buyerlocation, pickupoption, postid, name, image, category, price, quantity, seller, sellerphonenumber, sellerlocation)
      res.status(200).json(dataObj)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  // });
}




const getAll = async (req, res) => {
 
  try {
    const dataObj = await Orders.getAll()

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUserOrders = async (req, res) => {
  const { user } = req.params;

  try {
    const dataObj = await Orders.getUserOrders(user)

    res.status(200).json(dataObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getOrder = async (req, res) => {
  const { postid } = req.params;

  try {
    const dataObj = await Orders.getOrder(postid)

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
                  insertOrder,  
                  getAll, 
                  getAllInCategory,
                  getUserOrders,
                  getOrder       
                }