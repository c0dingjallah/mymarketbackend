const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {phonenumber, password} = req.body
  console.log(phonenumber);
  console.log(password);
  try {
    const user = await User.login(phonenumber, password)

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

// signup a user
const signupUser = async (req, res) => {
  const {phonenumber, username, location, password} = req.body

  try {
    const user = await User.signup(phonenumber, username, location, password)

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

const getUser = async (req, res) => {
  const {userid} = req.body
  
  try {
    const user = await User.get(userid)

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { signupUser, loginUser, getUser }