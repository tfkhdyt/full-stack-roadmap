import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto'
import { User } from '../users/users.entity'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // register
  register(body: RegisterDto) {
    return this.usersService.createUser(body)
  }

  // validate user
  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user: User = await this.usersService.findOne({ email })
    if (!user) throw new NotFoundException('User tidak ditemukan')
    const passwordIsValid = await compare(password, user.password).catch(
      (err) => {
        throw new BadRequestException(err.message)
      },
    )
    if (!passwordIsValid) throw new UnauthorizedException('Password is wrong')

    return user
  }

  // login
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)
    const payload = {
      id: user._id,
      role: user.role,
    }
    return { token: this.jwtService.sign(payload) }
  }
}
