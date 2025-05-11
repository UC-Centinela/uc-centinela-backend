import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

@Injectable()
export class FindOneVerificationQuestionUseCase {
  constructor (private readonly storage: IVerificationQuestionStorageAdapter) {}

  execute (id: number): Promise<VerificationQuestion> {
    return this.storage.findOne(id)
  }
}
