import { VerificationQuestion } from '@verification-question/domain/verification-question'
import { VerificationQuestion as PrismaVerificationQuestion } from '@prisma/client'

const mapPrismaVerificationQuestionToDomain = (data: PrismaVerificationQuestion): VerificationQuestion => {
  return VerificationQuestion.reconstitute({
    id: data.id,
    criticActivityId: data.criticActivityId,
    title: data.title,
    description: data.description
  })
}

export { mapPrismaVerificationQuestionToDomain }
