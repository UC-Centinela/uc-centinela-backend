import { UndesiredEvent } from '@undesired-event/domain/undesired-event'
import { UndesiredEvent as PrismaUndesiredEvent } from '@prisma/client'

const mapPrismaUndesiredEventToDomain = (data: PrismaUndesiredEvent): UndesiredEvent => {
  return UndesiredEvent.reconstitute({
    id: data.id,
    criticActivityId: data.criticActivityId,
    title: data.title,
    description: data.description
  })
}

export { mapPrismaUndesiredEventToDomain }
