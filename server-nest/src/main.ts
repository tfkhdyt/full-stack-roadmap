import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as compression from 'compression'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(compression())
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(4000)
}
bootstrap()
