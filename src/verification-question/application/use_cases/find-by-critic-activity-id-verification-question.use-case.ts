import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

@Injectable()
export class FindByCriticActivityIdVerificationQuestionUseCase {
  constructor(private readonly storage: IVerificationQuestionStorageAdapter) {}

  execute(criticActivityId: number): Promise<VerificationQuestion[]> {
    return this.storage.findAllByCriticActivityId(criticActivityId)
  }
}
