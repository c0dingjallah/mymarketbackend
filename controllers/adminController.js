const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginAdmin = async (req, res) => {
  const {admin, password} = req.body
  console.log(admin);
  console.log(password);
  try {
    const user = await Admin.login(admin, password)

    // create a token
    const token = createToken(user._id)

    const returnObj = {
      token,
      ...user._doc
    }

    res.status(200).json(returnObj)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}





module.exports = { loginAdmin }