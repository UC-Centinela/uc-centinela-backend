import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

import { UndesiredEventService } from '@undesired-event/application/undesired-event.service'
import { UndesiredEventResolver } from './adapters/apollo/resolvers/undesired-event.resolver'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'
import { UndesiredEventStorageAdapter } from './adapters/repository/undesired-event-prisma.repository'
import { UndesiredEventStorage } from './adapters/prisma/undesired-event.storage'

import { CreateUndesiredEventUseCase } from '@undesired-event/application/use_cases/create-undesired-event.use-case'
import { UpdateUndesiredEventUseCase } from '@undesired-event/application/use_cases/update-undesired-event.use-case'
import { DeleteUndesiredEventUseCase } from '@undesired-event/application/use_cases/delete-undesired-event.use-case'
import { FindAllUndesiredEventUseCase } from '@undesired-event/application/use_cases/find-all-undesired-event.use-case'
import { FindOneUndesiredEventUseCase } from '@undesired-event/application/use_cases/find-one-undesired-event.use-case'
import { FindByCriticActivityIdUndesiredEventUseCase } from '@undesired-event/application/use_cases/find-by-critic-activity-id-undesired-event.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    PrismaService,
    UndesiredEventStorage,
    UndesiredEventStorageAdapter,
    UndesiredEventResolver,
    CreateUndesiredEventUseCase,
    UpdateUndesiredEventUseCase,
    DeleteUndesiredEventUseCase,
    FindAllUndesiredEventUseCase,
    FindOneUndesiredEventUseCase,
    FindByCriticActivityIdUndesiredEventUseCase,
    {
      provide: 'IUndesiredEventService',
      useClass: UndesiredEventService
    },
    {
      provide: IUndesiredEventStorageAdapter,
      useClass: UndesiredEventStorageAdapter
    }
  ],
  exports: ['IUndesiredEventService']
})
export class UndesiredEventModule {}
