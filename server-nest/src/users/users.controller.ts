import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common'
import {User} from './users.entity'
import {Request} from 'express'

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Req() req: Request) {
    if (req.user)
      return 'Bakekok'
    throw new UnauthorizedException()
  }
}
