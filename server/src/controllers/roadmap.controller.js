const roadmap = require('../models/roadmap.model')

exports.addRoadmap = async (req, res) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }

  try {
    const result = await roadmap.create({
      ...req.body,
      accepted: req.user.role == 'admin' ? true : false,
      userId: req.user._id,
    })
    res.status(200).send({
      message: 'Input data berhasil',
      data: result,
    })
  } catch (err) {
    res.status(500).send({
      message: 'Input data gagal',
      data: err.message,
    })
  }
}

exports.getRoadmaps = async (req, res) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT token',
    })
  }

  if (req.user.role === 'admin') {
    try {
      const result = await roadmap.find().sort('order')
      res.status(200).send({
        message: 'Query berhasil',
        data: result,
        role: req.user.role,
      })
    } catch (err) {
      res.status(500).send({
        message: 'Query gagal',
        data: err.message,
      })
    }
  } else {
    try {
      const result = await roadmap.find({
        userId: req.user._id,
      })
      res.status(200).send({
        message: 'Query berhasil',
        data: result,
        role: req.user.role,
      })
    } catch (err) {
      res.status(500).send({
        message: 'Query gagal',
        data: err.message,
      })
    }
  }
}

exports.editRoadmap = async (req, res) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }

  const { id } = req.params
  let updatedUser
  try {
    updatedUser = await roadmap.findById(id)
  } catch (err) {
    res.status(404).send({
      message: 'User not found',
      data: err.message,
    })
  }

  try {
    const result = await roadmap.findByIdAndUpdate(updatedUser._id, req.body)
    res.status(200).send({
      message: 'Ubah data berhasil',
      data: result,
    })
  } catch (err) {
    res.status(500).send({
      message: 'Ubah data gagal',
      data: err.message,
    })
  }
}
