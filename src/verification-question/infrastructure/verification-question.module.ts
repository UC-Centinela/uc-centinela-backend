import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

import { VerificationQuestionService } from '@verification-question/application/verification-question.service'
import { VerificationQuestionResolver } from './adapters/apollo/resolvers/verification-question.resolver'
import { IVerificationQuestionStorageAdapter } from '@verification-question/domain/interfaces/verification-question.repository'
import { VerificationQuestionStorageAdapter } from './adapters/repository/verification-question-prisma.repository'
import { VerificationQuestionStorage } from './adapters/prisma/verification-question.storage'

import { CreateVerificationQuestionUseCase } from '@verification-question/application/use_cases/create-verification-question.use-case'
import { UpdateVerificationQuestionUseCase } from '@verification-question/application/use_cases/update-verification-question.use-case'
import { DeleteVerificationQuestionUseCase } from '@verification-question/application/use_cases/delete-verification-question.use-case'
import { FindAllVerificationQuestionUseCase } from '@verification-question/application/use_cases/find-all-verification-question.use-case'
import { FindOneVerificationQuestionUseCase } from '@verification-question/application/use_cases/find-one-verification-question.use-case'
import { FindByCriticActivityIdVerificationQuestionUseCase } from '@verification-question/application/use_cases/find-by-critic-activity-id-verification-question.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    PrismaService,
    VerificationQuestionStorage,
    VerificationQuestionStorageAdapter,
    VerificationQuestionResolver,
    CreateVerificationQuestionUseCase,
    UpdateVerificationQuestionUseCase,
    DeleteVerificationQuestionUseCase,
    FindAllVerificationQuestionUseCase,
    FindOneVerificationQuestionUseCase,
    FindByCriticActivityIdVerificationQuestionUseCase,
    {
      provide: 'IVerificationQuestionService',
      useClass: VerificationQuestionService
    },
    {
      provide: IVerificationQuestionStorageAdapter,
      useClass: VerificationQuestionStorageAdapter
    }
  ],
  exports: ['IVerificationQuestionService']
})
export class VerificationQuestionModule {}
