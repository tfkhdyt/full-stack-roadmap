import express from 'express'

import { User } from '../user'

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any, User>
    }
  }
}
