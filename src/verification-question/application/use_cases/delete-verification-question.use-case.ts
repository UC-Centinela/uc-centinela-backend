import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'

@Injectable()
export class DeleteVerificationQuestionUseCase {
  constructor(private readonly storage: IVerificationQuestionStorageAdapter) {}

  execute(id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
