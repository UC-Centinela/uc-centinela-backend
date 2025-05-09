import { Control } from '@control/domain/control'
import { Control as PrismaControl } from '@prisma/client'

const mapPrismaControlToDomain = (data: PrismaControl): Control => {
  return Control.reconstitute({
    id: data.id,
    criticActivityId: data.criticActivityId,
    title: data.title,
    description: data.description
  })
}

export { mapPrismaControlToDomain }
