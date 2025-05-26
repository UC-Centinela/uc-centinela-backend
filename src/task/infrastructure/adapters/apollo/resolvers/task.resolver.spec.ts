import { Test, TestingModule } from '@nestjs/testing'
import { TaskResolver } from './task.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Task, TaskState } from '@task/domain/task'

const moduleMocker = new ModuleMocker(global)

describe('TaskResolver', () => {
  let resolver: TaskResolver
  let taskService: any
  let logger: any

  const now = new Date()
  const mockTask = Task.reconstitute({
    id: 1,
    title: 'Tarea',
    instruction: 'Instrucción',
    state: TaskState.PENDING,
    creatorUserId: 1,
    comments: 'comentario',
    changeHistory: 'historial',
    assignationDate: now,
    requiredSendDate: now,
    revisorUserId: null,
    createdAt: now,
    updatedAt: now
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver]
    }).useMocker((token) => {
      if (token === 'ITaskService') {
        taskService = {
          create: jest.fn().mockResolvedValue(mockTask),
          findAll: jest.fn().mockResolvedValue([mockTask]),
          findOne: jest.fn().mockResolvedValue(mockTask),
          update: jest.fn().mockResolvedValue(mockTask),
          delete: jest.fn().mockResolvedValue(true),
          findAllByUserId: jest.fn().mockResolvedValue([mockTask])
        }
        return taskService
      }

      if (token === 'LOGGER') {
        logger = {
          debug: jest.fn(),
          setTraceContext: jest.fn()
        }
        return logger
      }

      if (typeof token === 'function') {
        const metadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(metadata)
        return new Mock()
      }
    }).compile()

    resolver = module.get(TaskResolver)
  })

  it('se instancia correctamente', () => {
    expect(resolver).toBeDefined()
    expect(logger.setTraceContext).toHaveBeenCalledWith('TaskResolver')
  })

  it('crea una tarea y registra en logger', async () => {
    const input = {
      title: 'Nueva',
      instruction: 'Hacer algo',
      state: TaskState.PENDING,
      creatorUserId: 1
    }

    const result = await resolver.createTask(input as any)
    expect(result).toEqual(mockTask)
    expect(logger.debug).toHaveBeenCalledWith('[createTask] Creating task...')
    expect(taskService.create).toHaveBeenCalledWith(input)
  })

  it('retorna todas las tareas y registra en logger', async () => {
    const result = await resolver.findAllTasks()
    expect(result).toEqual([mockTask])
    expect(logger.debug).toHaveBeenCalledWith('[findAll] Fetching all tasks...')
    expect(taskService.findAll).toHaveBeenCalled()
  })

  it('retorna una tarea por ID', async () => {
    const result = await resolver.findTask(1)
    expect(result).toEqual(mockTask)
    expect(taskService.findOne).toHaveBeenCalledWith(1)
  })

  it('actualiza una tarea', async () => {
    const input = { id: 1, title: 'Actualizada' }
    const result = await resolver.updateTask(input as any)
    expect(result).toEqual(mockTask)
    expect(taskService.update).toHaveBeenCalledWith({ id: 1, updateTask: input })
  })

  it('elimina una tarea', async () => {
    const result = await resolver.deleteTask(1)
    expect(result).toBe(true)
    expect(taskService.delete).toHaveBeenCalledWith(1)
  })

  it('retorna tareas por ID de usuario', async () => {
    const result = await resolver.findTasksByUser(1)
    expect(result).toEqual([mockTask])
    expect(taskService.findAllByUserId).toHaveBeenCalledWith(1)
  })

  // Casos de error

  it('lanza error si create falla', async () => {
    taskService.create.mockRejectedValueOnce(new Error('Fallo creación'))
    await expect(resolver.createTask({} as any)).rejects.toThrow('Fallo creación')
  })

  it('lanza error si findAll falla', async () => {
    taskService.findAll.mockRejectedValueOnce(new Error('Fallo findAll'))
    await expect(resolver.findAllTasks()).rejects.toThrow('Fallo findAll')
  })

  it('lanza error si findOne falla', async () => {
    taskService.findOne.mockRejectedValueOnce(new Error('Fallo findOne'))
    await expect(resolver.findTask(1)).rejects.toThrow('Fallo findOne')
  })

  it('lanza error si update falla', async () => {
    taskService.update.mockRejectedValueOnce(new Error('Fallo update'))
    await expect(resolver.updateTask({ id: 1 } as any)).rejects.toThrow('Fallo update')
  })

  it('lanza error si delete falla', async () => {
    taskService.delete.mockRejectedValueOnce(new Error('Fallo delete'))
    await expect(resolver.deleteTask(1)).rejects.toThrow('Fallo delete')
  })

  it('lanza error si findTasksByUser falla', async () => {
    taskService.findAllByUserId.mockRejectedValueOnce(new Error('Fallo usuario'))
    await expect(resolver.findTasksByUser(1)).rejects.toThrow('Fallo usuario')
  })
})
