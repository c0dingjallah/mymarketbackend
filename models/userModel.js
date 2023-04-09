const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  phonenumber: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
})


// static signup method
userSchema.statics.signup = async function(phonenumber, username, location, password) {


  const exists = await this.findOne({ phonenumber })

  if (exists) {
    throw Error('Phone number already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ phonenumber, username, location, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(phonenumber, password) {

  if (!phonenumber || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ phonenumber })
  if (!user) {
    throw Error('Incorrect email or phone number')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


userSchema.statics.get = async function(userid) {

  let query = { phonenumber: userid };
  let doc = await this.findOne(query);
  return doc;
}

module.exports = mongoose.model('user', userSchema, 'users')
