const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    admin: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
 
})

// static login method
adminSchema.statics.login = async function(admin, password) {

  
  
    const user = await this.findOne({ admin })
    if (!user) {
      throw Error('Incorrect username - User not found')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {    throw Error('Incorrect password')
    }
  
    return user
  }


  module.exports = mongoose.model('admin', adminSchema, 'admin')