import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

import { ControlStrategyService } from '@control-strategy/application/control-strategy.service'
import { ControlStrategyResolver } from './adapters/apollo/resolvers/control-strategy.resolver'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'
import { ControlStrategyStorageAdapter } from './adapters/repository/control-strategy-prisma.repository'
import { ControlStrategyStorage } from './adapters/prisma/control-strategy.storage'

import { CreateControlStrategyUseCase } from '@control-strategy/application/use_cases/create-control-strategy.use-case'
import { UpdateControlStrategyUseCase } from '@control-strategy/application/use_cases/update-control-strategy.use-case'
import { DeleteControlStrategyUseCase } from '@control-strategy/application/use_cases/delete-control-strategy.use-case'
import { FindAllControlStrategyUseCase } from '@control-strategy/application/use_cases/find-all-control-strategy.use-case'
import { FindOneControlStrategyUseCase } from '@control-strategy/application/use_cases/find-one-control-strategy.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    PrismaService,
    ControlStrategyStorage,
    ControlStrategyStorageAdapter,
    ControlStrategyResolver,
    CreateControlStrategyUseCase,
    UpdateControlStrategyUseCase,
    DeleteControlStrategyUseCase,
    FindAllControlStrategyUseCase,
    FindOneControlStrategyUseCase,
    {
      provide: 'IControlStrategyService',
      useClass: ControlStrategyService
    },
    {
      provide: IControlStrategyStorageAdapter,
      useClass: ControlStrategyStorageAdapter
    }
  ],
  exports: ['IControlStrategyService']
})
export class ControlStrategyModule {}
