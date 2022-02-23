import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { AddRoadmapDto } from './dto/add-roadmap.dto'
import { User } from '../users/users.entity'
import { Roadmap } from './roadmaps.entity'

@Injectable()
export class RoadmapsService {
  constructor(
    @InjectModel('Roadmap') private readonly roadmapModel: Model<Roadmap>,
  ) {}

  async getRoadmaps(query?: object) {
    const roadmaps = await this.roadmapModel
      .find(query)
      .sort('order')
      .populate('userId')
      .catch((err) => {
        throw new BadRequestException(err.message)
      })
    return roadmaps
  }

  getMyRoadmaps(userId: string, role: string) {
    if (role == 'admin') return this.getRoadmaps()
    return this.getRoadmaps({ userId })
  }

  getRoadmap(role: string, roadmapId: string, userId: string) {
    if (role == 'admin') return this.getRoadmaps({ _id: roadmapId })
    return this.getRoadmaps({ _id: roadmapId, userId })
  }

  async addRoadmap(addRoadmapDto: AddRoadmapDto, user: User) {
    const roadmap = await this.roadmapModel
      .create({
        ...addRoadmapDto,
        accepted: user.role == 'admin' ? true : false,
        userId: user.id,
      })
      .catch((err) => {
        throw new BadRequestException(err.message)
      })
    return {
      message: 'Input data berhasil!',
      data: roadmap,
    }
  }

  async updateRoadmap(req: any, roadmapId: string) {
    const data = req.body
    if (req.user.role !== 'admin' && data.accepted) delete data.accepted

    const result = await this.roadmapModel
      .findByIdAndUpdate(roadmapId, data)
      .catch((err) => {
        throw new BadRequestException(err.message)
      })

    return {
      message: 'Ubah data berhasil!',
      data: result,
    }
  }
}
