const express = require('express')

const { signup, signin } = require('../controllers/auth.controller')
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller')
const verifyToken = require('../middlewares/authJWT')

const router = express.Router()

router.post('/register', signup)
router.post('/login', signin)
router.get('/users', verifyToken, getAllUsers)
router.patch('/user/:id', verifyToken, updateUser)
router.delete('/user/:id', verifyToken, deleteUser)

module.exports = router
