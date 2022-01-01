const express = require('express')

const { signup, signin } = require('../controllers/auth.controller')
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')
const {
  addRoadmap,
  getRoadmaps,
  editRoadmap,
  getRoadmap,
  deleteRoadmap
} = require('../controllers/roadmap.controller')
const verifyToken = require('../middlewares/authJWT')

const router = express.Router()

router.post('/register', signup)
router.post('/login', signin)

router.get('/users', verifyToken, getAllUsers)
router.patch('/user/:id', verifyToken, updateUser)
router.delete('/user/:id', verifyToken, deleteUser)

router.post('/roadmap', verifyToken, addRoadmap)
router.get('/roadmap', verifyToken, getRoadmaps)
router.get('/roadmap/:id', verifyToken, getRoadmap)
router.patch('/roadmap/:id', verifyToken, editRoadmap)
router.delete('/roadmap/:id', verifyToken, deleteRoadmap)

module.exports = router
