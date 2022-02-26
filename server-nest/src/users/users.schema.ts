import { Schema } from 'mongoose'
import { User } from './users.entity'

export const UsersSchema: Schema = new Schema<User>({
  fullName: {
    type: String,
    required: [true, 'Fullname not provided'],
    trim: true,
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
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})
