import { Test, TestingModule } from '@nestjs/testing'
import { ToolResolver } from './tool.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('ToolResolver', () => {
  let resolver: ToolResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolResolver],
    }).useMocker((token) => {
      if (token === 'IToolService') {
        return {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          findAllByCriticActivityId: jest.fn()
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

    resolver = module.get<ToolResolver>(ToolResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
