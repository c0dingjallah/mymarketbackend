const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  orderid: {
    type: String,
    required: true
  },
  buyer: {
    type: String,
    required: true
  },
  buyerphonenumber:{
    type: String,
    required: true
  },
  buyerlocation:{
    type: String,
    required: true
  },
  pickupoption:{
    type: String,
    required: true
  },
  postid: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  sellerlocation: {
    type: String,
    required: true
  },
  sellerphonenumber: {
    type: String,
    required: true
  },
  instock: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  timeposted:{
    type: Date,
    required: false
  }
})


// static insert method
orderSchema.statics.insert = async function(orderid, buyer, buyerphonenumber, buyerlocation, pickupoption, postid, name, image, category, price, quantity, seller, sellerphonenumber, sellerlocation) {

  const exists = await this.findOne({ postid })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({ orderid, buyer, buyerphonenumber, buyerlocation, pickupoption, postid, name, image, category, price, quantity, seller, sellerphonenumber, sellerlocation, instock: "yes"})

  return post
}

orderSchema.statics.getUserPosts = async function(user) {

  let docs = await this.find({ user });
  return docs;
}

orderSchema.statics.getPost = async function(postid) {

  let doc = await this.findOne({ postid });
  return doc;
}


orderSchema.statics.getAll = async function() {

  let docs = await this.find();
  return docs;
}

orderSchema.statics.getAllInCategory = async function(category) {

  let query = { category: category };
  let docs = await this.find(query);
  return docs;
}

module.exports = mongoose.model('Pendingorders', orderSchema, 'pendingorders')
