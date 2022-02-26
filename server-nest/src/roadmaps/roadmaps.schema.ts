import { Schema } from 'mongoose'

import { Roadmap } from './roadmaps.entity'

export const RoadmapsSchema: Schema = new Schema<Roadmap>({
  order: {
    type: Number,
    unique: true,
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, 'Tolong masukkan title'],
    unique: true,
  },
  type: {
    type: String,
    required: [true, 'Tolong masukkan type'],
  },
  description: {
    type: String,
    required: [true, 'Tolong masukkan deskripsi'],
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
    required: [true, 'Tolong masukkan warna utama'],
  },
  linkVideo: {
    type: String,
    required: [true, 'Tolong masukkan link video'],
  },
  linkDocs: {
    type: String,
    required: [true, 'Tolong masukkan type'],
  },
  accepted: {
    type: Boolean,
    required: [true, 'Tolong masukkan status'],
  },
  userId: {
    type: String,
    required: [true, 'Tolong masukkan user id'],
    ref: 'User',
  },
})
