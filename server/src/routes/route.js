const express = require('express')
const { check } = require('express-validator')

const { signup, signin } = require('../controllers/auth.controller')
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')
const {
  addRoadmap,
  getRoadmaps,
  getAcceptedRoadmaps,
  editRoadmap,
  getRoadmap,
  deleteRoadmap,
} = require('../controllers/roadmap.controller')
const verifyToken = require('../middlewares/authJWT')

const router = express.Router()

router.post(
  '/register',
  check('email').isEmail(),
  check('password').isLength({ min: 8 }),
  signup
)
router.post('/login', signin)

router.get('/users', verifyToken, getAllUsers)
router.patch('/user/:id', verifyToken, updateUser)
router.delete('/user/:id', verifyToken, deleteUser)

router.post('/roadmap', verifyToken, addRoadmap)
router.get('/roadmap', verifyToken, getRoadmaps)
router.get('/roadmaps', getAcceptedRoadmaps)
router.get('/roadmap/:id', verifyToken, getRoadmap)
router.patch('/roadmap/:id', verifyToken, editRoadmap)
router.delete('/roadmap/:id', verifyToken, deleteRoadmap)

module.exports = router
