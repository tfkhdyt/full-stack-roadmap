import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RoadmapsController } from './roadmaps.controller'
import { RoadmapsService } from './roadmaps.service'
import { RoadmapsSchema } from './roadmaps.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Roadmap',
        schema: RoadmapsSchema,
      },
    ]),
  ],
  controllers: [RoadmapsController],
  providers: [RoadmapsService],
})
export class RoadmapsModule {}
