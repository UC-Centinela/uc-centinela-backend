import { Injectable } from '@nestjs/common'
import { CreateVerificationQuestionUseCase } from './use_cases/create-verification-question.use-case'
import { DeleteVerificationQuestionUseCase } from './use_cases/delete-verification-question.use-case'
import { FindAllVerificationQuestionUseCase } from './use_cases/find-all-verification-question.use-case'
import { FindOneVerificationQuestionUseCase } from './use_cases/find-one-verification-question.use-case'
import { UpdateVerificationQuestionUseCase } from './use_cases/update-verification-question.use-case'
import { FindByCriticActivityIdVerificationQuestionUseCase } from './use_cases/find-by-critic-activity-id-verification-question.use-case'
import { IVerificationQuestionService, CreateVerificationQuestionDTO, UpdateVerificationQuestionDTO } from '@verification-question/domain/interfaces/verification-question.interface'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

@Injectable()
export class VerificationQuestionService implements IVerificationQuestionService {
  constructor (
    private readonly createUseCase: CreateVerificationQuestionUseCase,
    private readonly updateUseCase: UpdateVerificationQuestionUseCase,
    private readonly findAllUseCase: FindAllVerificationQuestionUseCase,
    private readonly findOneUseCase: FindOneVerificationQuestionUseCase,
    private readonly deleteUseCase: DeleteVerificationQuestionUseCase,
    private readonly findByCriticActivityUseCase: FindByCriticActivityIdVerificationQuestionUseCase
  ) {}

  create (dto: CreateVerificationQuestionDTO): Promise<VerificationQuestion> {
    return this.createUseCase.execute(dto)
  }

  findAll (): Promise<VerificationQuestion[]> {
    return this.findAllUseCase.execute()
  }

  findOne (id: number): Promise<VerificationQuestion> {
    return this.findOneUseCase.execute(id)
  }

  update (dto: UpdateVerificationQuestionDTO): Promise<VerificationQuestion> {
    return this.updateUseCase.execute(dto)
  }

  delete (id: number): Promise<boolean> {
    return this.deleteUseCase.execute(id)
  }

  findAllByCriticActivityId (criticActivityId: number): Promise<VerificationQuestion[]> {
    return this.findByCriticActivityUseCase.execute(criticActivityId)
  }
}
