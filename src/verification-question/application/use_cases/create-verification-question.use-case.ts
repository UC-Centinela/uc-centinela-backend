import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { CreateVerificationQuestionDTO } from '@verification-question/domain/interfaces/verification-question.interface'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

@Injectable()
export class CreateVerificationQuestionUseCase {
  constructor (private readonly storage: IVerificationQuestionStorageAdapter) {}

  execute (dto: CreateVerificationQuestionDTO): Promise<VerificationQuestion> {
    const entity = VerificationQuestion.create(dto)
    return this.storage.create(entity)
  }
}
