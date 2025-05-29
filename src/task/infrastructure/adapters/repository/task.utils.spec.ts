import { mapPrismaTaskToDomain } from './task.utils'
import { TaskState } from '@task/domain/task'

describe('mapPrismaTaskToDomain', () => {
  it('mapea correctamente un objeto de Prisma a entidad de dominio', () => {
    const prismaTask = {
      id: 1,
      title: 'Tarea',
      instruction: 'Instrucción',
      state: TaskState.PENDING,
      creatorUserId: 1,
      revisorUserId: 2,
      comments: 'Comentario',
      changeHistory: 'Historial',
      assignationDate: new Date(),
      requiredSendDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = mapPrismaTaskToDomain(prismaTask)
    expect(result.title).toBe('Tarea')
    expect(result.state).toBe(TaskState.PENDING)
  })
})
