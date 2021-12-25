const bcrypt = require('bcrypt')

const user = require('../models/user.model')

exports.getAllUsers = async (req, res) => {
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

exports.updateUser = async (req, res) => {
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
    } catch (err) {
      res.status(404).send({
        message: 'User not found',
        data: err.message,
      })
    }

    const { fullName, role, email, password } = updatedUser
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
    } catch (err) {
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

exports.deleteUser = async (req, res) => {
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
    } catch (err) {
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
