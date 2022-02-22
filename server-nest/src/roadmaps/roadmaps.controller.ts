import { Controller, Get, HttpCode, UseGuards, Req } from '@nestjs/common'
import { RoadmapsService } from './roadmaps.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from 'src/users/users.entity'

interface MyReq extends Request {
  user?: User
}

@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @Get('public')
  @HttpCode(200)
  getAcceptedRoadmaps() {
    return this.roadmapsService.getRoadmaps({ accepted: true })
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getRoadmaps(@Req() req: MyReq) {
    const { id, role } = req.user
    return this.roadmapsService.getMyRoadmaps(id, role)
  }
}
