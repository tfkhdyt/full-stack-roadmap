import { Request, Response } from 'express'
import _ from 'underscore'

const trimmer = (req: Request, res: Response, next: () => void) => {
  req.body = _.object(
    _.map(req.body, (value: any, key: any) => {
      if (typeof value === 'string') return [key, value.trim()]
      else return [key, value]
    })
  )
  next()
}

/*const postTrimmer = (req: Request, res: Response, next: () => void) => {
  if (req.method === 'POST') {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') req.body[key] = value.trim()
    }
  }
  next()
}*/

export default trimmer
