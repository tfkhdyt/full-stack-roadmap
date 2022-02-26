import { Document } from 'mongoose'

export class Roadmap extends Document {
  order: number
  title: string
  type: string
  description: string
  icon: string
  color: string
  linkVideo: string
  linkDocs: string
  accepted: boolean
  userId: string
}
