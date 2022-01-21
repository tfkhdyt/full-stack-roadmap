import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import user from '../models/user.model'
import { User } from '../types/user'

export const getAllUsers = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }
  if (req.user.role == 'admin') {
    const users = await user.find()
    res.status(200).send({
      message: 'query success!',
      data: users,
    })
  } else {
    res.status(403).send({
      message: 'Unauthorized access!',
    })
  }
}

export const getUserData = async (req: Request, res: Response) => {
  const { id } = req.params
  const _user: User = (await user.findOne({
    _id: id,
  })) as User
  res.status(200).send({
    message: 'query success!',
    data: _user,
  })
}

export const updateUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }
  if (req.user.role == 'admin') {
    const { id } = req.params
    let updatedUser
    try {
      updatedUser = await user.findById(id)
    } catch (err: any) {
      res.status(404).send({
        message: 'User not found',
        data: err.message,
      })
    }

    const { fullName, role, email, password }: User = updatedUser as User
    const _fullName = req.body.fullName || fullName
    const _role = req.body.role || role
    const _email = req.body.email || email
    const _password = req.body.password || password

    try {
      updatedUser = await user.findByIdAndUpdate(id, {
        fullName: _fullName,
        role: _role,
        email: _email,
        password: bcrypt.hashSync(_password, 8),
      })
    } catch (err: any) {
      res.send({
        message: 'update failed!',
        data: err.message,
      })
    }
    res.status(200).send({
      message: 'update success!',
      data: updatedUser,
    })
  } else {
    res.status(403).send({
      message: 'Unauthorized access!',
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }
  if (req.user.role == 'admin') {
    const { id } = req.params
    let deletedUser
    try {
      deletedUser = await user.findByIdAndDelete(id)
    } catch (err: any) {
      res.send({
        message: 'delete failed!',
        data: err.message,
      })
    }
    res.status(200).send({
      message: 'delete success!',
      data: deletedUser,
    })
  } else {
    res.status(403).send({
      message: 'Unauthorized access!',
    })
  }
}
