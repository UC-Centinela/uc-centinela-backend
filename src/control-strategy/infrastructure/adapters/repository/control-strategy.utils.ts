import { ControlStrategy } from '@control-strategy/domain/control-strategy'
import { ControlStrategy as PrismaControlStrategy } from '@prisma/client'

const mapPrismaControlStrategyToDomain = (data: PrismaControlStrategy): ControlStrategy => {
  return ControlStrategy.reconstitute({
    id: data.id,
    taskId: data.taskId,
    title: data.title
  })
}

export { mapPrismaControlStrategyToDomain }
