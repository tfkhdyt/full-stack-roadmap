import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'
import { Secret } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { User } from '../users/users.entity'
import { sign } from 'jsonwebtoken'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // register
  register(body: RegisterDto) {
    return this.usersService.createUser(body)
  }

  // login
  async login(loginDto: LoginDto) {
    const API_SECRET: Secret = process.env.API_SECRET as Secret
    const { email, password } = loginDto

    let user: User
    try {
      user = await this.usersService.findOne({ email })

      if (!user) throw new NotFoundException('User not found!')
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }

    try {
      const passwordIsValid: boolean = await compare(password, user.password)
      if (!passwordIsValid) throw new UnauthorizedException('Password salah!')
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }

    const token = sign({ id: user._id }, API_SECRET, { expiresIn: '30d' })

    return {
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      message: 'Login success',
      accessToken: token,
    }
  }
}
