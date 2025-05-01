import { Test, TestingModule } from '@nestjs/testing'
import { TaskService } from './task.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('TaskService', () => {
  let service: TaskService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).useMocker((token) => {
      if (token === 'ITaskStorageAdapter') {
        return {
          findAll: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        }
      }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<TaskService>(TaskService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
