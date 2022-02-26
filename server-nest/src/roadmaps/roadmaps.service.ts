import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Request } from 'express'

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
    console.log(`My role: ${role}`)
    if (role == 'admin') return this.getRoadmaps()
    return this.getRoadmaps({ userId })
  }

  async getRoadmap(role: string, roadmapId: string, userId: string) {
    let roadmap: any
    if (role == 'admin') roadmap = await this.getRoadmaps({ _id: roadmapId })
    else roadmap = await this.getRoadmaps({ _id: roadmapId, userId })
    if (roadmap.length === 0)
      throw new NotFoundException('Data tidak ditemukan!')
    return roadmap[0]
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

  async updateRoadmap(req: Request, roadmapId: string) {
    const { id, role } = req.user
    let roadmap: any

    if (role === 'admin') roadmap = await this.getRoadmaps({ _id: roadmapId })
    else roadmap = await this.getRoadmaps({ _id: roadmapId, userId: id })

    if (roadmap.length == 0)
      throw new NotFoundException('Data yang ingin anda ubah tidak ditemukan')

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

  async deleteRoadmap(req: Request, roadmapId: string) {
    const { id, role } = req.user
    let roadmap: any

    if (role === 'admin') roadmap = await this.getRoadmaps({ _id: roadmapId })
    else roadmap = await this.getRoadmaps({ _id: roadmapId, userId: id })

    if (roadmap.length == 0)
      throw new NotFoundException('Data yang ingin anda hapus tidak ditemukan')

    const result = await this.roadmapModel
      .findByIdAndDelete(roadmapId)
      .catch((err) => {
        throw new BadRequestException(err.message)
      })

    return {
      message: 'Data berhasil dihapus!',
      data: result,
    }
  }
}
