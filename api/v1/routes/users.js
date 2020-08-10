const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//models
const User = require('../models/User')

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

router.get('/', (req, res) => {
  User.find({})
    .select('-password')
    .then((users) => {
      res.json({ users: users })
    })
    .catch((err) => {})
})
module.exports = router
