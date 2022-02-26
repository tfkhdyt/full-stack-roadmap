import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { hash } from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // create user
  async createUser(body: CreateUserDto) {
    const { fullName, email, password, role } = body

    const user = await this.userModel
      .create({
        fullName,
        email,
        password: await hash(password, 8),
        role: role,
      })
      .catch((err) => {
        throw new BadRequestException(err.message)
      })

    return {
      message: 'User registered successfully',
      data: user,
    }
  }

  async findAll() {
    const users = await this.userModel.find().catch((err) => {
      throw new BadRequestException(err.message)
    })
    if (users.length == 0) throw new NotFoundException('User tidak ditemukan')
    return users
  }

  // find one
  async findOne(query: object) {
    const user = await this.userModel.findOne(query).catch((err) => {
      throw new BadRequestException(err.message)
    })
    if (!user) throw new NotFoundException('User tidak ditemukan')
    return user
  }

  // find by id
  async findById(id: string) {
    const user = await this.userModel.findById(id).catch((err) => {
      throw new BadRequestException(err.message)
    })
    if (!user) throw new NotFoundException('User tidak ditemukan')
    return user
  }
}
