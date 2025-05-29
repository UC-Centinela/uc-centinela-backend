import { TaskStorageAdapter } from './task-prisma.repository'
import { TaskStorage } from '../prisma/task.storage'
import { Task, TaskState } from '@task/domain/task'

describe('TaskStorageAdapter', () => {
  let adapter: TaskStorageAdapter
  let storage: jest.Mocked<TaskStorage>

  const now = new Date()

  const prismaTaskMock = {
    id: 1,
    title: 'X',
    instruction: 'Y',
    state: TaskState.PENDING,
    creatorUserId: 1,
    comments: 'Comentario',
    changeHistory: 'Historial',
    assignationDate: now,
    requiredSendDate: now,
    revisorUserId: 2,
    createdAt: now,
    updatedAt: now
  }

  beforeEach(() => {
    storage = {
      createTask: jest.fn().mockResolvedValue(prismaTaskMock),
      tasks: jest.fn().mockResolvedValue([prismaTaskMock]),
      task: jest.fn().mockResolvedValue(prismaTaskMock),
      updateTask: jest.fn().mockResolvedValue(prismaTaskMock),
      deleteTask: jest.fn().mockResolvedValue(prismaTaskMock),
      findAllByUserId: jest.fn().mockResolvedValue([prismaTaskMock])
    } as any

    adapter = new TaskStorageAdapter(storage)
  })

  it('crea una tarea y la mapea correctamente', async () => {
    const input = Task.reconstitute({ id: 1, ...prismaTaskMock })
    const result = await adapter.create(input)
    expect(result.title).toBe('X')
    expect(storage.createTask).toHaveBeenCalled()
  })

  it('lanza error si falla la creación', async () => {
    storage.createTask.mockRejectedValueOnce(new Error('Falla DB'))
    await expect(adapter.create(Task.reconstitute(prismaTaskMock))).rejects.toThrow('Falla DB')
  })

  it('retorna todas las tareas y las mapea', async () => {
    const result = await adapter.findAll()
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('X')
    expect(storage.tasks).toHaveBeenCalled()
  })

  it('lanza error si falla findAll', async () => {
    storage.tasks.mockRejectedValueOnce(new Error('DB down'))
    await expect(adapter.findAll()).rejects.toThrow('DB down')
  })

  it('retorna una tarea por ID', async () => {
    const result = await adapter.findOne(1)
    expect(result.id).toBe(1)
    expect(result.title).toBe('X')
    expect(storage.task).toHaveBeenCalledWith(1)
  })

  it('lanza error si falla findOne', async () => {
    storage.task.mockRejectedValueOnce(new Error('No encontrada'))
    await expect(adapter.findOne(1)).rejects.toThrow('No encontrada')
  })

  it('actualiza una tarea y la mapea', async () => {
    const input = Task.reconstitute(prismaTaskMock)
    const result = await adapter.update(input)
    expect(result.id).toBe(1)
    expect(result.title).toBe('X')
    expect(storage.updateTask).toHaveBeenCalled()
  })

  it('lanza error si falla el update', async () => {
    storage.updateTask.mockRejectedValueOnce(new Error('Update falló'))
    await expect(adapter.update(Task.reconstitute(prismaTaskMock))).rejects.toThrow('Update falló')
  })

  it('elimina una tarea y retorna true', async () => {
    const result = await adapter.delete(1)
    expect(result).toBe(true)
    expect(storage.deleteTask).toHaveBeenCalledWith(1)
  })

  it('lanza error si falla delete', async () => {
    storage.deleteTask.mockRejectedValueOnce(new Error('Error al eliminar'))
    await expect(adapter.delete(1)).rejects.toThrow('Error al eliminar')
  })

  it('retorna tareas por ID de usuario', async () => {
    const result = await adapter.findAllByUserId(1)
    expect(result.length).toBe(1)
    expect(result[0].creatorUserId).toBe(1)
    expect(storage.findAllByUserId).toHaveBeenCalledWith(1)
  })

  it('lanza error si falla findAllByUserId', async () => {
    storage.findAllByUserId.mockRejectedValueOnce(new Error('Error de usuario'))
    await expect(adapter.findAllByUserId(99)).rejects.toThrow('Error de usuario')
  })
})
