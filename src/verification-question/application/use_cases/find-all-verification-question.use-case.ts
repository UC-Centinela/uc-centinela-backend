import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

@Injectable()
export class FindAllVerificationQuestionUseCase {
  constructor(private readonly storage: IVerificationQuestionStorageAdapter) {}

  execute(): Promise<VerificationQuestion[]> {
    return this.storage.findAll()
  }
}
