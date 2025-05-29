import { TaskStorage } from './task.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

describe('TaskStorage', () => {
  let prisma: jest.Mocked<PrismaService>
  let storage: TaskStorage

  beforeEach(() => {
    prisma = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    } as any

    storage = new TaskStorage(prisma)
  })

  it('crea una tarea', async () => {
    await storage.createTask({ title: 'x' } as any)
    expect(prisma.task.create).toHaveBeenCalled()
  })

  it('obtiene todas las tareas', async () => {
    await storage.tasks()
    expect(prisma.task.findMany).toHaveBeenCalled()
  })

  it('obtiene una tarea por ID', async () => {
    await storage.task(1)
    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
  })

  it('actualiza una tarea', async () => {
    await storage.updateTask(1, { title: 'z' } as any)
    expect(prisma.task.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { title: 'z' } })
  })

  it('elimina una tarea', async () => {
    await storage.deleteTask(1)
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } })
  })

  it('busca tareas por ID de usuario', async () => {
    await storage.findAllByUserId(5)
    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { creatorUserId: 5 } })
  })
})
