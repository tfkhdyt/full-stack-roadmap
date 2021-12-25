const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roadmapSchema = new Schema({
  order: {
    type: Number,
    unique: [true, 'Nomor order telah digunakan'],
    default: Date.now,
  },
  title: {
    type: String,
    required: [true, 'Tolong masukkan title'],
    unique: [true, 'Title telah digunakan'],
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
  },
})

module.exports = mongoose.model('Roadmap', roadmapSchema)
