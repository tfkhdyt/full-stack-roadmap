import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Roadmap } from './roadmaps.entity'

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectModel('Roadmap') private readonly roadmapModel: Model<Roadmap>,
  ) {}

  async getRoadmaps(query?: object) {
    try {
      const roadmaps = await this.roadmapModel.find(query).sort('order')
      if (roadmaps.length == 0)
        throw new NotFoundException('Roadmaps not found')
      return roadmaps
    } catch (err) {
      throw new NotFoundException(err.message)
    }
  }

  getMyRoadmaps(userId: string, role: string) {
    if (role == 'admin') {
      return this.getRoadmaps()
    } else {
      return this.getRoadmaps({ userId })
    }
  }

  getRoadmap(role: string, roadmapId: string, userId: string) {
    if (role == 'admin') {
      return this.getRoadmaps({ _id: roadmapId })
    } else {
      return this.getRoadmaps({ _id: roadmapId, userId })
    }
  }
}
