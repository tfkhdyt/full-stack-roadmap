import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/users/users.entity'

import { Roadmap } from './roadmaps.entity'
import { AddRoadmapDto } from './dto/add-roadmap.dto'

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectModel('Roadmap') private readonly roadmapModel: Model<Roadmap>,
  ) {}

  async getRoadmaps(query?: object) {
    try {
      const roadmaps = await this.roadmapModel
        .find(query)
        .sort('order')
        .populate('userId')
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

  async addRoadmap(addRoadmapDto: AddRoadmapDto, user: User) {
    try {
      const roadmap = await this.roadmapModel.create({
        ...addRoadmapDto,
        accepted: user.role == 'admin' ? true : false,
        userId: user.id,
      })
      return {
        message: 'Input data berhasil!',
        data: roadmap,
      }
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
