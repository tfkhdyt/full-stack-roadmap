import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Req() req: Request) {
    console.log(req.user)
    return 'Auth success!'
  }
}
