import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

import { ControlService } from '@control/application/control.service'
import { ControlResolver } from './adapters/apollo/resolvers/control.resolver'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'
import { ControlStorageAdapter } from './adapters/repository/control-prisma.repository'
import { ControlStorage } from './adapters/prisma/control.storage'

import { CreateControlUseCase } from '@control/application/use_cases/create-control.use-case'
import { UpdateControlUseCase } from '@control/application/use_cases/update-control.use-case'
import { DeleteControlUseCase } from '@control/application/use_cases/delete-control.use-case'
import { FindAllControlUseCase } from '@control/application/use_cases/find-all-control.use-case'
import { FindOneControlUseCase } from '@control/application/use_cases/find-one-control.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    PrismaService,
    ControlStorage,
    ControlStorageAdapter,
    ControlResolver,
    CreateControlUseCase,
    UpdateControlUseCase,
    DeleteControlUseCase,
    FindAllControlUseCase,
    FindOneControlUseCase,
    {
      provide: 'IControlService',
      useClass: ControlService
    },
    {
      provide: IControlStorageAdapter,
      useClass: ControlStorageAdapter
    }
  ],
  exports: ['IControlService']
})
export class ControlModule {}
