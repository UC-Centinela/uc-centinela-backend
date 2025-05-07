import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { CriticActivityService } from '@critic-activity/application/critic-activity.service'
import { CriticActivityResolver } from './adapters/apollo/resolvers/critic-activity.resolver'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'
import { CriticActivityStorageAdapter } from './adapters/repository/critic-activity-prisma.repository'
import { CriticActivityStorage } from './adapters/prisma/critic-activity.storage'

import { CreateCriticActivityUseCase } from '@critic-activity/application/use_cases/create-critic-activity.use-case'
import { UpdateCriticActivityUseCase } from '@critic-activity/application/use_cases/update-critic-activity.use-case'
import { DeleteCriticActivityUseCase } from '@critic-activity/application/use_cases/delete-critic-activity.use-case'
import { FindAllCriticActivityUseCase } from '@critic-activity/application/use_cases/find-all-critic-activity.use-case'
import { FindOneCriticActivityUseCase } from '@critic-activity/application/use_cases/find-one-critic-activity.use-case'
import { FindByTaskIdCriticActivityUseCase } from '@critic-activity/application/use_cases/find-by-task-id-critic-activity.use-case'


@Module({
  imports: [CommonsModule],
  providers: [
    CriticActivityResolver,
    PrismaService,
    CriticActivityStorage,
    CriticActivityStorageAdapter,
    CreateCriticActivityUseCase,
    UpdateCriticActivityUseCase,
    DeleteCriticActivityUseCase,
    FindAllCriticActivityUseCase,
    FindOneCriticActivityUseCase,
    FindByTaskIdCriticActivityUseCase,
    {
      provide: 'ICriticActivityService',
      useClass: CriticActivityService
    },
    {
      provide: ICriticActivityStorageAdapter,
      useClass: CriticActivityStorageAdapter
    }
  ],
  exports: ['ICriticActivityService']
})
export class CriticActivityModule {}
