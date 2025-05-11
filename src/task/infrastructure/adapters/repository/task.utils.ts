import { Task, TaskState } from '@task/domain/task'
import { Task as PrismaTask } from '@prisma/client'

const mapPrismaTaskToDomain = (data: PrismaTask): Task => {
  return Task.reconstitute({
    id: data.id,
    title: data.title,
    instruction: data.instruction,
    comments: data.comments,
    state: data.state as TaskState,
    assignationDate: data.assignationDate,
    requiredSendDate: data.requiredSendDate,
    creatorUserId: data.creatorUserId,
    revisorUserId: data.revisorUserId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    changeHistory: data.changeHistory,
  })
}

export { mapPrismaTaskToDomain }
