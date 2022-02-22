import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common'
import { RoadmapsService } from './roadmaps.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

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
  getRoadmaps(@Req() req: any) {
    const { id, role } = req.user
    return this.roadmapsService.getMyRoadmaps(id, role)
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getRoadmap(@Req() req: any, @Param('id') roadmapId: string) {
    const { id, role } = req.user
    return this.roadmapsService.getRoadmap(role, roadmapId, id)
  }
}
