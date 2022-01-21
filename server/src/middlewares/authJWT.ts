import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

import User from '../models/user.model'
// import { User as UserType } from '../types/user'

const verifyToken = (req: Request, res: Response, next: any) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] == 'Bearer'
  ) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.API_SECRET as Secret,
      (err: any, decode: { id: string } | any) => {
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

export default verifyToken
