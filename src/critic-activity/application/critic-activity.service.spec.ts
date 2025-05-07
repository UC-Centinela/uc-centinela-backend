import { Test, TestingModule } from '@nestjs/testing'
import { CriticActivityService } from './critic-activity.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('CriticActivityService', () => {
  let service: CriticActivityService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriticActivityService],
    }).useMocker((token) => {
      if (token === 'ICriticActivityStorageAdapter') {
        return {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn()
        }
      }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<CriticActivityService>(CriticActivityService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
