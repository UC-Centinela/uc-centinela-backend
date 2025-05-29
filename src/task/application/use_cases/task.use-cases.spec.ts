import { TaskState, Task } from '@task/domain/task'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { CreateTaskUseCase } from './create-task.use-case'
import { UpdateTaskUseCase } from './update-task.use-case'
import { DeleteTaskUseCase } from './delete-task.use-case'
import { FindAllTaskUseCase } from './find-all-task.use-case'
import { FindOneTaskUseCase } from './find-one-task.use-case'
import { FindByUserIdTaskUseCase } from './find-by-user-id-task.use-case'

describe('Task Use Cases', () => {
  let storage: jest.Mocked<ITaskStorageAdapter>

  beforeEach(() => {
    storage = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      findAllByUserId: jest.fn(),
      findAllByReviewerId: jest.fn(),
    }
  })

  describe('CreateTaskUseCase', () => {
    const dto = {
      title: 'Nueva tarea',
      instruction: 'Instrucción',
      state: TaskState.PENDING,
      creatorUserId: 1
    }

    it('crea una tarea correctamente', async () => {
      const task = Task.create(dto)
      storage.create.mockResolvedValue(task)

      const useCase = new CreateTaskUseCase(storage)
      const result = await useCase.execute(dto)

      expect(storage.create).toHaveBeenCalledWith(expect.any(Task))
      expect(result).toEqual(task)
    })

    it('lanza un error si el repositorio falla', async () => {
      storage.create.mockRejectedValue(new Error('Error en create'))

      const useCase = new CreateTaskUseCase(storage)
      await expect(useCase.execute(dto)).rejects.toThrow('Error en create')
    })
  })

  describe('UpdateTaskUseCase', () => {
    const dto = {
      id: 1,
      updateTask: { title: 'Actualizada' }
    }

    it('actualiza una tarea con los datos indicados', async () => {
      const task = Task.reconstitute({ id: 1, title: 'Actualizada', instruction: '', state: TaskState.PENDING, creatorUserId: 1 } as any)
      storage.update.mockResolvedValue(task)

      const useCase = new UpdateTaskUseCase(storage)
      const result = await useCase.execute(dto)

      expect(storage.update).toHaveBeenCalledWith(expect.any(Task))
      expect(result).toEqual(task)
    })

    it('lanza un error si falla el repositorio', async () => {
      storage.update.mockRejectedValue(new Error('Error en update'))

      const useCase = new UpdateTaskUseCase(storage)
      await expect(useCase.execute(dto)).rejects.toThrow('Error en update')
    })
  })

  describe('DeleteTaskUseCase', () => {
    it('elimina la tarea con el ID dado', async () => {
      storage.delete.mockResolvedValue(true)

      const useCase = new DeleteTaskUseCase(storage)
      const result = await useCase.execute(1)

      expect(storage.delete).toHaveBeenCalledWith(1)
      expect(result).toBe(true)
    })

    it('lanza un error si falla la eliminación', async () => {
      storage.delete.mockRejectedValue(new Error('Error en delete'))

      const useCase = new DeleteTaskUseCase(storage)
      await expect(useCase.execute(1)).rejects.toThrow('Error en delete')
    })
  })

  describe('FindAllTaskUseCase', () => {
    it('retorna todas las tareas almacenadas', async () => {
      const tasks = [Task.reconstitute({ id: 1, title: 'X', instruction: '', state: TaskState.PENDING, creatorUserId: 1 } as any)]
      storage.findAll.mockResolvedValue(tasks)

      const useCase = new FindAllTaskUseCase(storage)
      const result = await useCase.execute()

      expect(storage.findAll).toHaveBeenCalled()
      expect(result).toEqual(tasks)
    })

    it('lanza un error si falla la consulta', async () => {
      storage.findAll.mockRejectedValue(new Error('Error en findAll'))

      const useCase = new FindAllTaskUseCase(storage)
      await expect(useCase.execute()).rejects.toThrow('Error en findAll')
    })
  })

  describe('FindOneTaskUseCase', () => {
    it('retorna una tarea específica', async () => {
      const task = Task.reconstitute({ id: 42, title: 'Tarea', instruction: '', state: TaskState.PENDING, creatorUserId: 1 } as any)
      storage.findOne.mockResolvedValue(task)

      const useCase = new FindOneTaskUseCase(storage)
      const result = await useCase.execute(42)

      expect(storage.findOne).toHaveBeenCalledWith(42)
      expect(result).toEqual(task)
    })

    it('lanza un error si no encuentra la tarea', async () => {
      storage.findOne.mockRejectedValue(new Error('Error en findOne'))

      const useCase = new FindOneTaskUseCase(storage)
      await expect(useCase.execute(42)).rejects.toThrow('Error en findOne')
    })
  })

  describe('FindByUserIdTaskUseCase', () => {
    it('retorna todas las tareas asociadas a un usuario', async () => {
      const tasks = [Task.reconstitute({ id: 1, title: 'U', instruction: '', state: TaskState.PENDING, creatorUserId: 99 } as any)]
      storage.findAllByUserId.mockResolvedValue(tasks)

      const useCase = new FindByUserIdTaskUseCase(storage)
      const result = await useCase.execute(99)

      expect(storage.findAllByUserId).toHaveBeenCalledWith(99)
      expect(result).toEqual(tasks)
    })

    it('lanza un error si falla la búsqueda por usuario', async () => {
      storage.findAllByUserId.mockRejectedValue(new Error('Error en findByUser'))

      const useCase = new FindByUserIdTaskUseCase(storage)
      await expect(useCase.execute(99)).rejects.toThrow('Error en findByUser')
    })
  })
})
