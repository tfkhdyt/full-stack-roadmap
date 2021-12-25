const bcrypt = require('bcrypt')

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
      data: result
    })
  } catch (err) {
    res.status(500).send({
      message: 'Input data gagal',
      data: err.message
    })
  }
}

exports.getRoadmapsById = async (req, res) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }

  console.log(req.user._id)

  try {
    const result = await roadmap.find({
      userId: req.user._id
    })
    res.status(200).send({
      message: 'Query berhasil',
      data: result
    })
  } catch (err) {
    res.status(500).send({
      message: 'Query gagal',
      data: err.message
    })
  }
}

exports.getRoadmapsByStatus = async (req, res) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }

  const { status } = req.params

  let accepted
  if (status == 'accepted')
    accepted = true
  else if (status == 'pending')
    accepted = false
  else {
    res.status(404).send({
      message: 'Status tidak valid'
    })
  }

  try {
    const result = await roadmap.find({
      accepted: accepted
    })
    res.status(200).send({
      message: 'Query berhasil',
      data: result
    })
  } catch (err) {
    res.status(500).send({
      message: 'Query gagal',
      data: err.message
    })
  }
}
