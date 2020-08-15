const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

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
    .then((product) => {
      res.json(product[0])
    })
    .catch((err) => res.json(err))
})

module.exports = router
