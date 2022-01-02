const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../models/user.model')

exports.signup = (req, res) => {
  const errors = validationResult(req)
  console.log('errors')
  if (!errors.isEmpty()) {
    return res.send({
      errors: errors.array(),
    })
  }
  const { fullName, email, password, role } = req.body
  const user = new User({
    fullName,
    email,
    password: bcrypt.hashSync(password, 8),
    role: role,
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      })
      return
    } else {
      res.status(200).send({
        message: 'User registered successfully',
        data: user,
      })
    }
  })
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
      })
    }
    if (!user) {
      return res.status(404).send({
        message: 'User not found.',
      })
    }

    //comparing passwords
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid password!',
      })
      return
    }
    //signing token with user id
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.API_SECRET,
      {
        expiresIn: '30d',
      }
    )

    //responding to client request with user profile success message and  access token .
    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      message: 'Login success',
      accessToken: token,
    })
  })
}
