import { Injectable } from '@nestjs/common'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { UpdateVerificationQuestionDTO } from '@verification-question/domain/interfaces/verification-question.interface'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

@Injectable()
export class UpdateVerificationQuestionUseCase {
  constructor(private readonly storage: IVerificationQuestionStorageAdapter) {}

  execute(dto: UpdateVerificationQuestionDTO): Promise<VerificationQuestion> {
    const entity = VerificationQuestion.reconstitute({ id: dto.id, ...dto.updateVerificationQuestion } as any)
    return this.storage.update(entity)
  }
}
