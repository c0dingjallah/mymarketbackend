const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
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
  user: {
    type: String,
    required: true
  },
  userphonenumber: {
    type: String,
    required: true
  },
  location: {
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
postSchema.statics.insert = async function(postid, name, image, category, price, user, location, userphonenumber, quantity) {

  const exists = await this.findOne({ postid })

  if (exists) {
    throw Error('Record Already Inserted')
  }

  const post = await this.create({postid, name, image, category, price, user, location, userphonenumber, quantity, instock: "yes"})

  return post
}

postSchema.statics.getUserPosts = async function(user) {

  let docs = await this.find({ user });
  return docs;
}

postSchema.statics.getPost = async function(postid) {

  let doc = await this.findOne({ postid });
  return doc;
}


postSchema.statics.getAll = async function() {

  let docs = await this.find();
  return docs;
}

postSchema.statics.getAllInCategory = async function(category) {

  let query = { category: category };
  let docs = await this.find(query);
  return docs;
}

module.exports = mongoose.model('Posts', postSchema, 'posts')
