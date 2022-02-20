import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(body: CreateUserDto) {
    const { fullName, email, password, role } = body

    let user: any
    try {
      user = new this.userModel({
        fullName,
        email,
        password: await hash(password, 8),
        role: role,
      })
    } catch (err) {
      throw new BadRequestException(err.message)
    }

    try {
      const result = await user.save()
      return {
        message: 'User registered successfully',
        data: result,
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
