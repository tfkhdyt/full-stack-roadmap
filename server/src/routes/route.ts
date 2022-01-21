import express from 'express'
import { check } from 'express-validator'

import { signup, signin } from '../controllers/auth.controller'
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller'
import {
  addRoadmap,
  getRoadmaps,
  getAcceptedRoadmaps,
  editRoadmap,
  getRoadmap,
  deleteRoadmap,
} from '../controllers/roadmap.controller'
import verifyToken from '../middlewares/authJWT'

const router = express.Router()

router.post(
  '/register',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email anda tidak valid'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password harus lebih dari 8 huruf'),
  ],
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

export default router
