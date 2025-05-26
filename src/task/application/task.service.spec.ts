import { Test, TestingModule } from '@nestjs/testing'
import { TaskService } from './task.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Task, TaskState } from '@task/domain/task'
import { CreateTaskUseCase } from './use_cases/create-task.use-case'
import { UpdateTaskUseCase } from './use_cases/update-task.use-case'
import { DeleteTaskUseCase } from './use_cases/delete-task.use-case'
import { FindAllTaskUseCase } from './use_cases/find-all-task.use-case'
import { FindOneTaskUseCase } from './use_cases/find-one-task.use-case'
import { FindByUserIdTaskUseCase } from './use_cases/find-by-user-id-task.use-case'


const moduleMocker = new ModuleMocker(global)

describe('TaskService', () => {
  let service: TaskService

  const validTask = Task.reconstitute({
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
      providers: [TaskService],
    }).useMocker((token) => {
      if (token === CreateTaskUseCase) return { execute: jest.fn().mockResolvedValue(validTask) }
      if (token === FindAllTaskUseCase) return { execute: jest.fn().mockResolvedValue([validTask]) }
      if (token === FindOneTaskUseCase) return { execute: jest.fn().mockResolvedValue(validTask) }
      if (token === UpdateTaskUseCase) return { execute: jest.fn().mockResolvedValue(validTask) }
      if (token === DeleteTaskUseCase) return { execute: jest.fn().mockResolvedValue(true) }
      if (token === FindByUserIdTaskUseCase) return { execute: jest.fn().mockResolvedValue([validTask]) }

      if (typeof token === 'function') {
        const metadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(metadata)
        return new Mock()
      }
    }).compile()

    service = module.get(TaskService)
  })

  it('se instancia correctamente', () => {
    expect(service).toBeDefined()
  })

  it('crea una tarea válida', async () => {
    const dto = {
      title: 'Inspección',
      instruction: 'Revisar motor',
      state: TaskState.PENDING,
      creatorUserId: 1
    }
    const result = await service.create(dto)
    expect(result).toEqual(validTask)
  })

  it('lanza error al intentar crear una tarea con datos inválidos', async () => {
    jest.spyOn(service['createTask'], 'execute').mockRejectedValueOnce(new Error('Error al crear tarea'))
    await expect(service.create({ title: '', instruction: '', state: TaskState.PENDING, creatorUserId: 1 }))
      .rejects.toThrow('Error al crear tarea')
  })

  it('retorna todas las tareas', async () => {
    const result = await service.findAll()
    expect(result).toEqual([validTask])
  })

  it('lanza error al fallar la obtención de todas las tareas', async () => {
    jest.spyOn(service['findAllTask'], 'execute').mockRejectedValueOnce(new Error('Error al obtener tareas'))
    await expect(service.findAll()).rejects.toThrow('Error al obtener tareas')
  })

  it('retorna una tarea por su ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(validTask)
  })

  it('lanza error si no encuentra una tarea por ID', async () => {
    jest.spyOn(service['findOneTask'], 'execute').mockRejectedValueOnce(new Error('Tarea no encontrada'))
    await expect(service.findOne(999)).rejects.toThrow('Tarea no encontrada')
  })

  it('actualiza una tarea existente', async () => {
    const result = await service.update({ id: 1, updateTask: { title: 'Actualizada' } })
    expect(result).toEqual(validTask)
  })

  it('lanza error al intentar actualizar una tarea no válida', async () => {
    jest.spyOn(service['updateTask'], 'execute').mockRejectedValueOnce(new Error('Error de actualización'))
    await expect(service.update({ id: 1, updateTask: { title: '' } })).rejects.toThrow('Error de actualización')
  })

  it('elimina una tarea por ID', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })

  it('lanza error al fallar la eliminación de una tarea', async () => {
    jest.spyOn(service['deleteTask'], 'execute').mockRejectedValueOnce(new Error('Error al eliminar tarea'))
    await expect(service.delete(999)).rejects.toThrow('Error al eliminar tarea')
  })

  it('retorna tareas creadas por un usuario específico', async () => {
    const result = await service.findAllByUserId(1)
    expect(result).toEqual([validTask])
  })

  it('lanza error si falla la búsqueda por ID de usuario', async () => {
    jest.spyOn(service['findByUserIdTask'], 'execute').mockRejectedValueOnce(new Error('Error de búsqueda por usuario'))
    await expect(service.findAllByUserId(999)).rejects.toThrow('Error de búsqueda por usuario')
  })
})
