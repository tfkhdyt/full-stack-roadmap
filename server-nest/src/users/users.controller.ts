import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  UnauthorizedException,
} from '@nestjs/common'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Req() req: any) {
    if (req.user.role == 'admin') return this.usersService.findAll()
    throw new UnauthorizedException()
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
