import { Test, TestingModule } from '@nestjs/testing'
import { RoadmapsService } from './roadmaps.service'

describe('RoadmapsService', () => {
  let service: RoadmapsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoadmapsService],
    }).compile()

    service = module.get<RoadmapsService>(RoadmapsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
