import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersSchema } from './users.schema'
import { UsersService } from './users.service'
import { VerifyJwtMiddleware } from './middlewares/verify-jwt.middleware'

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
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJwtMiddleware).forRoutes()
  }
}
