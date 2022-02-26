import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('role')
  @UseGuards(JwtAuthGuard)
  getMyRole(@Req() req: Request) {
    const { role } = req.user
    return role
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Req() req: any) {
    if (req.user.role == 'admin') return this.usersService.findAll()
    throw new UnauthorizedException()
  }
}
