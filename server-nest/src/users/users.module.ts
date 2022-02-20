import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersSchema } from './users.schema'
import { UsersService } from './users.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
