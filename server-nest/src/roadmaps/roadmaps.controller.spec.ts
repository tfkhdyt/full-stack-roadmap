import { Test, TestingModule } from '@nestjs/testing'
import { RoadmapsController } from './roadmaps.controller'

describe('RoadmapsController', () => {
  let controller: RoadmapsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadmapsController],
    }).compile()

    controller = module.get<RoadmapsController>(RoadmapsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
