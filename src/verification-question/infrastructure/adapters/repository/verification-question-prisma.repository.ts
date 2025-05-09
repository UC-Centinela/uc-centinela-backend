import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { VerificationQuestion } from '@verification-question/domain/verification-question'
import { VerificationQuestionStorage } from '../prisma/verification-question.storage'
import { mapPrismaVerificationQuestionToDomain } from './verification-question.utils'

@Injectable()
export class VerificationQuestionStorageAdapter implements IVerificationQuestionStorageAdapter {
  constructor(private readonly storage: VerificationQuestionStorage) {}

  async create(entity: VerificationQuestion): Promise<VerificationQuestion> {
    const result = await this.storage.createVerificationQuestion({
      criticActivity: { connect: { id: entity.criticActivityId } },
      title: entity.title,
      description: entity.description
    })

    return mapPrismaVerificationQuestionToDomain(result)
  }

  async findAll(): Promise<VerificationQuestion[]> {
    const result = await this.storage.verificationQuestions()
    return result.map(mapPrismaVerificationQuestionToDomain)
  }

  async findOne(id: number): Promise<VerificationQuestion> {
    const result = await this.storage.verificationQuestion(id)
    return mapPrismaVerificationQuestionToDomain(result)
  }

  async update(entity: VerificationQuestion): Promise<VerificationQuestion> {
    const result = await this.storage.updateVerificationQuestion(entity.id, {
      title: entity.title,
      description: entity.description
    })

    return mapPrismaVerificationQuestionToDomain(result)
  }

  async delete(id: number): Promise<boolean> {
    await this.storage.deleteVerificationQuestion(id)
    return true
  }

  async findAllByCriticActivityId(criticActivityId: number): Promise<VerificationQuestion[]> {
    const result = await this.storage.findAllByCriticActivityId(criticActivityId)
    return result.map(mapPrismaVerificationQuestionToDomain)
  }
}
