import { IsEmail, IsString, Length } from 'class-validator'

export class RegisterDto {
  @IsString()
  fullName: string

  @IsEmail()
  email: string

  @Length(8)
  password: string

  role: 'normal' | 'admin'
}
