import { Test, TestingModule } from '@nestjs/testing'
import { CriticActivityResolver } from './critic-activity.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('CriticActivityResolver', () => {
  let resolver: CriticActivityResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriticActivityResolver],
    }).useMocker((token) => {
      if (token === 'ICriticActivityService') {
        return {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn()
        }
      }

      if (token === 'LOGGER') {
        return {
          debug: jest.fn(),
          setTraceContext: jest.fn()
        }
      }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    resolver = module.get<CriticActivityResolver>(CriticActivityResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
