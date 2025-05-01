import { CriticActivity } from '@critic-activity/domain/critic-activity'
import { CriticActivity as PrismaCriticActivity } from '@prisma/client'

export const mapPrismaCriticActivityToDomain = (data: PrismaCriticActivity): CriticActivity => {
  return CriticActivity.reconstitute({
    id: data.id,
    title: data.title,
    taskId: data.taskId
  })
}
