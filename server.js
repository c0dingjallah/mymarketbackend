require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/orders')
const adminRoutes = require('./routes/admin')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cors({
  origin: '*'
}));

// routes

app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)


mongoose.set('strictQuery', true);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })