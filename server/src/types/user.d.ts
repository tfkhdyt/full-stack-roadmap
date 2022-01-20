import { Document } from 'mongoose'

export interface User extends Document {
  _id?: string
  fullName: string | (boolean | string)[]
  email: string | any
  password: string
  role: string
}
