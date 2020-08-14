const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  price:{
    type:String
  },
  shipping: {
    type: String,
  },
  manufacturer: {
    type: String
  },
  url: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  created:{
    type:Date,
    default:Date.now
  }
})

module.exports = Product = mongoose.model('products', ProductSchema)
