import { Test, TestingModule } from '@nestjs/testing'
import { TaskResolver } from './task.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { TaskState, Task } from '@task/domain/task'

const moduleMocker = new ModuleMocker(global)

describe('TaskResolver - flujo real con toDomain', () => {
  let resolver: TaskResolver

  const mockTask = Task.reconstitute({
    id: 1,
    title: 'Inspección',
    instruction: 'Revisar motor',
    state: TaskState.PENDING,
    creatorUserId: 1,
    comments: 'Comentario inicial',
    changeHistory: 'Cambio inicial',
    assignationDate: null,
    requiredSendDate: null,
    revisorUserId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver],
    }).useMocker((token) => {
      if (token === 'ITaskService') {
        return {
          create: jest.fn().mockResolvedValue(mockTask),
          findAll: jest.fn().mockResolvedValue([mockTask]),
          findOne: jest.fn().mockResolvedValue(mockTask),
          update: jest.fn().mockResolvedValue(mockTask),
          delete: jest.fn().mockResolvedValue(true)
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

  it('should create a task', async () => {
    const input = {
      title: 'Inspección',
      instruction: 'Revisar motor',
      state: TaskState.PENDING,
      creatorUserId: 1,
      toDomain: () => mockTask
    }

    const result = await resolver.createTask(input as any)
    expect(result).toEqual(mockTask)
  })

  it('should return all tasks', async () => {
    const result = await resolver.findAllTasks()
    expect(result).toEqual([mockTask])
  })

  it('should return a task by ID', async () => {
    const result = await resolver.findTask(1)
    expect(result).toEqual(mockTask)
  })

  it('should update a task', async () => {
    const result = await resolver.updateTask({
      id: 1,
      title: 'Modificada'
    } as any)
    expect(result).toEqual(mockTask)
  })

  it('should delete a task', async () => {
    const result = await resolver.deleteTask(1)
    expect(result).toBe(true)
  })
})
