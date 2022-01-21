import mongoose, { Schema } from 'mongoose'

import { User as UserType } from '../types/user'

/**
 * User Schema
 */
const userSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Fullname not provided'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Email not provided'],
  },
  role: {
    type: String,
    enum: ['normal', 'admin'],
    default: 'normal',
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<UserType>('User', userSchema)
