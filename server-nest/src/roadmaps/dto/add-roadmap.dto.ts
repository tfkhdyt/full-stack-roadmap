import { IsString, IsNotEmpty } from 'class-validator'

export class AddRoadmapDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  icon: string

  @IsString()
  @IsNotEmpty()
  color: string

  @IsString()
  @IsNotEmpty()
  linkVideo: string

  @IsString()
  @IsNotEmpty()
  linkDocs: string
}
