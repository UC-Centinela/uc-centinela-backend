import { Tool } from '@tool/domain/tool'
import { Tool as PrismaTool } from '@prisma/client'

const mapPrismaToolToDomain = (data: PrismaTool): Tool => {
  return Tool.reconstitute({
    id: data.id,
    criticActivityId: data.criticActivityId,
    title: data.title
  })
}

export { mapPrismaToolToDomain }
