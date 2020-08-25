const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Review = require('../models/Review')
const passport = require('passport')
router.get('/', (req, res) => {
  // let number
  Product.find({})
    .then((products) => {
      res.json({ totalCount: products.length, products: products })
    })
    .catch((err) => res.json(err))
})

router.get('/:id', (req, res) => {
  let { id } = req.params
  Product.find({ _id: id })
    .populate({ path: 'reviews', populate: [{ path: 'user' }] })
    .then((product) => {
      res.json(product[0])
    })
    .catch((err) => res.json(err))
})
router.post(
  '/:id/review/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { id } = req.params
    let { rating, text } = req.body
    let { user } = req

    const newReview = new Review({
      product: id,
      rating,
      user: user._id,
      text,
    })

    newReview.save().then((review) => {
      //finds the the product and updates the reviews array
      Product.findOneAndUpdate(
        {
          _id: review.product,
        },
        { $push: { reviews: review._id } },
        { new: true, upsert: true }
      )
        .then((product) => {
          Product.find({ _id: id })
            .sort({ created: -1 })
            .populate('user')
            .populate({ path: 'reviews', populate: [{ path: 'user' }] })
            .then((product) => {
              res.json(product)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
)

module.exports = router
