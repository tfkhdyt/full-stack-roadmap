import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Roadmap } from './roadmaps.entity'
import { Model } from 'mongoose'

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectModel('Roadmap') private readonly roadmapModel: Model<Roadmap>,
  ) {}

  async getRoadmaps(query?: object) {
    try {
      const roadmaps = await this.roadmapModel.find(query).sort('order')
      if (!roadmaps) throw new NotFoundException('Roadmaps not found')
      return roadmaps
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async getMyRoadmaps(userId: string, role: string) {
    if (role == 'admin') {
      return this.getRoadmaps()
    } else {
      return this.getRoadmaps({ userId })
    }
  }
}
