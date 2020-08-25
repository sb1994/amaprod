const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ReviewSchema = new Schema({
  text: {
    type: String,
  },
  rating: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
  },

  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Review = mongoose.model('reviews', ReviewSchema)
