import { Request, Response } from 'express'

import roadmap from '../models/roadmap.model'
import user from '../models/user.model'
import { User } from '../types/user'

export const addRoadmap = async (req: Request, res: Response) => {
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
  } catch (err: any) {
    res.status(500).send({
      message: 'Input data gagal',
      data: err.message,
    })
  }
}

export const getRoadmaps = async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res.status(500).send({
        message: 'Query gagal',
        data: err.message,
      })
    }
  } else {
    try {
      const result = await roadmap
        .find({
          userId: req.user._id,
        })
        .sort('order')
      res.status(200).send({
        message: 'Query berhasil',
        data: result,
        role: req.user.role,
      })
    } catch (err: any) {
      res.status(500).send({
        message: 'Query gagal',
        data: err.message,
      })
    }
  }
}

export const editRoadmap = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }

  const { id } = req.params
  let updatedData
  try {
    updatedData = await roadmap.findById(id)
  } catch (err: any) {
    res.status(404).send({
      message: 'Data not found',
      data: err.message,
    })
  }

  const data = req.body
  if (req.user.role !== 'admin' && data.accepted) delete data.accepted

  try {
    const result = await roadmap.findByIdAndUpdate(updatedData._id, data)
    res.status(200).send({
      message: 'Ubah data berhasil',
      data: result,
      role: req.user.role,
    })
  } catch (err: any) {
    res.status(500).send({
      message: 'Ubah data gagal',
      data: err.message,
    })
  }
}

export const getRoadmap = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT token',
    })
  }

  const { id } = req.params

  if (req.user.role === 'admin') {
    try {
      const result = await roadmap
        .findOne({
          _id: id,
        })
        .sort('order')
      if (!result) {
        res.status(404).send({
          message: 'Query gagal',
          title: 'Data tidak ditemukan',
        })
      }
      const submitter = (await user.findOne({
        _id: result.userId,
      })) as User
      res.status(200).send({
        message: 'Query berhasil',
        data: result,
        submitter: submitter.fullName,
        role: req.user.role,
      })
    } catch (err: any) {
      res.status(500).send({
        message: 'Query gagal',
        data: err.message,
      })
    }
  } else {
    try {
      const result = await roadmap
        .findOne({
          _id: id,
          userId: req.user._id,
        })
        .sort('order')
      if (!result) {
        res.status(404).send({
          message: 'Query gagal',
          title: 'Data tidak ditemukan',
        })
      }
      res.status(200).send({
        message: 'Query berhasil',
        data: result,
        submitter: req.user.fullName,
      })
    } catch (err: any) {
      res.status(500).send({
        message: 'Query gagal',
        data: err.message,
      })
    }
  }
}

export const deleteRoadmap = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).send({
      message: 'Invalid JWT Token',
    })
  }

  const { id } = req.params
  let deletedData
  try {
    deletedData = await roadmap.findById(id)
  } catch (err: any) {
    res.status(404).send({
      message: 'Data not found',
      data: err.message,
    })
  }

  try {
    const result = await roadmap.findByIdAndDelete(deletedData._id)
    res.status(200).send({
      message: 'Hapus data berhasil',
      data: result,
      role: req.user.role,
    })
  } catch (err: any) {
    res.status(500).send({
      message: 'Hapus data gagal',
      data: err.message,
    })
  }
}

export const getAcceptedRoadmaps = async (req: Request, res: Response) => {
  try {
    const result = await roadmap.find({ accepted: true }).sort('order')
    res.status(200).send({
      message: 'Query berhasil',
      data: result,
    })
  } catch (err: any) {
    res.status(500).send({
      message: 'Query gagal',
      data: err.message,
    })
  }
}
