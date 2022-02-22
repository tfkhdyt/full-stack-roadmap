import { Controller, Get, Req, UseGuards, Param } from '@nestjs/common'
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

  @Get('all')
  getAllRoadmaps() {
    return [
      {
        hello: 'world!',
      },
    ]
  }

  @Get(':id')
  getRoadmap(@Param('id') id: string) {
    return id
  }
}
