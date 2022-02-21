import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { verify, Secret } from 'jsonwebtoken'
import { User } from '../users.entity'
import { UsersService } from '../users.service'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] == 'Bearer'
    ) {
      let decode: any
      try {
        decode = verify(
          req.headers.authorization.split(' ')[1],
          process.env.API_SECRET as Secret,
        )
      } catch (err) {
        throw new UnauthorizedException(err.message)
      }

      const user = await this.usersService.findOne({ _id: decode.id })
      req.user = user
      next()
    } else {
      throw new BadRequestException('Tidak ada token!')
    }
  }
}
