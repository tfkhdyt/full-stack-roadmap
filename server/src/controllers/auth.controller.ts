import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

import User from '../models/user.model'
import { User as UserType } from '../types/user'

export const signup = (req: Request, res: Response) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    res.status(404).json({
      errors: errors.array(),
    })
    return
  }
  const { fullName, email, password, role }: UserType = req.body
  const user = new User({
    fullName,
    email,
    password: bcrypt.hashSync(password, 8),
    role: role,
  })

  user.save((err: any, user: UserType) => {
    if (err) {
      res.status(500).send({
        message: err,
      })
    } else {
      res.status(200).send({
        message: 'User registered successfully',
        data: user,
      })
    }
  })
}

export const signin = (req: Request, res: Response) => {
  const API_SECRET: Secret = process.env.$API_SECRET as Secret
  User.findOne({
    email: req.body.email,
  }).exec((err: any, user) => {
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
    const passwordIsValid: boolean = bcrypt.compareSync(
      req.body.password,
      user.password
    )
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password!',
      })
    }
    //signing token with user id
    const token = jwt.sign(
      {
        id: user._id,
      },
      API_SECRET,
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
