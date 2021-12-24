const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] == 'JWT'
  ) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.API_SECRET,
      (err, decode) => {
        if (err) {
          req.user = undefined
          next()
        }
        // console.log(decode)
        User.findOne({
          _id: decode.id,
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({
              message: err,
            })
          } else {
            req.user = user
            next()
          }
        })
      }
    )
  } else {
    req.user = undefined
    next()
  }
}
module.exports = verifyToken
