import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(body: RegisterDto) {
    return this.usersService.createUser(body)
  }
}
