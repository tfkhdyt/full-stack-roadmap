/*declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        role: string
      }
    }
  }
}*/

declare namespace Express {
  export interface Request {
    user: {
      id: string
      role: string
    }
  }
  export interface Response {
    user: any
  }
}
