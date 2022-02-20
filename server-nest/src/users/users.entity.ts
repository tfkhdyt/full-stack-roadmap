import { Document } from 'mongoose'

export class User extends Document {
  fullName: string
  email: string
  password: string
  role: 'normal' | 'admin'
  created: Date
}
