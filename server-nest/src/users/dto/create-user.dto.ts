import { IsString, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  fullName: string

  @IsEmail()
  email: string

  @Length(8)
  password: string

  role: 'normal' | 'admin'
}
