import { Test, TestingModule } from '@nestjs/testing'
import { TaskResolver } from './task.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('TaskResolver', () => {
  let resolver: TaskResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver],
    }).useMocker((token) => {
      if (token === 'ITaskService') {
        return {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          delete: jest.fn()
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

    resolver = module.get<TaskResolver>(TaskResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
