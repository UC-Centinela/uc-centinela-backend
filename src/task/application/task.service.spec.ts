import { Test, TestingModule } from '@nestjs/testing'
import { TaskService } from './task.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Task } from '@task/domain/task'
import { TaskState } from '@task/domain/task'

// Importa los use-cases
import { CreateTaskUseCase } from './use_cases/create-task.use-case'
import { UpdateTaskUseCase } from './use_cases/update-task.use-case'
import { DeleteTaskUseCase } from './use_cases/delete-task.use-case'
import { FindAllTaskUseCase } from './use_cases/find-all-task.use-case'
import { FindOneTaskUseCase } from './use_cases/find-one-task.use-case'

const moduleMocker = new ModuleMocker(global)

describe('TaskService - flujo real', () => {
  let service: TaskService

  const mockTask = Task.reconstitute({
    id: 1,
    title: 'Inspección',
    instruction: 'Revisar motor',
    state: TaskState.PENDING,
    creatorUserId: 1,
    comments: 'Comentario inicial',
    videoUrl: null,
    audioTranscription: null,
    assignationDate: null,
    requiredSendDate: null,
    revisorUserId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).useMocker((token) => {
      // Mock específico para cada use-case
      if (token === CreateTaskUseCase) {
        return { execute: jest.fn().mockResolvedValue(mockTask) }
      }
      if (token === FindAllTaskUseCase) {
        return { execute: jest.fn().mockResolvedValue([mockTask]) }
      }
      if (token === FindOneTaskUseCase) {
        return { execute: jest.fn().mockResolvedValue(mockTask) }
      }
      if (token === UpdateTaskUseCase) {
        return { execute: jest.fn().mockResolvedValue(mockTask) }
      }
      if (token === DeleteTaskUseCase) {
        return { execute: jest.fn().mockResolvedValue(true) }
      }

      // Por si algún token es clase, genera mock dinámico
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

  it('should create a task', async () => {
    const result = await service.create({
      title: 'Inspección',
      instruction: 'Revisar motor',
      state: TaskState.PENDING,
      creatorUserId: 1
    })
    expect(result).toEqual(mockTask)
  })

  it('should return all tasks', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockTask])
  })

  it('should return one task by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockTask)
  })

  it('should update a task', async () => {
    const result = await service.update({
      id: 1,
      updateTask: { title: 'Modificada' }
    })
    expect(result).toEqual(mockTask)
  })

  it('should delete a task', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })
})
