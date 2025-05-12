import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

import { ToolService } from '@tool/application/tool.service'
import { ToolResolver } from './adapters/apollo/resolvers/tool.resolver'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'
import { ToolStorageAdapter } from './adapters/repository/tool-prisma.repository'
import { ToolStorage } from './adapters/prisma/tool.storage'

import { CreateToolUseCase } from '@tool/application/use_cases/create-tool.use-case'
import { UpdateToolUseCase } from '@tool/application/use_cases/update-tool.use-case'
import { DeleteToolUseCase } from '@tool/application/use_cases/delete-tool.use-case'
import { FindAllToolUseCase } from '@tool/application/use_cases/find-all-tool.use-case'
import { FindOneToolUseCase } from '@tool/application/use_cases/find-one-tool.use-case'
import { FindByCriticActivityIdToolUseCase } from '@tool/application/use_cases/find-by-critic-activity-id-tool.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    PrismaService,
    ToolStorage,
    ToolStorageAdapter,
    ToolResolver,
    CreateToolUseCase,
    UpdateToolUseCase,
    DeleteToolUseCase,
    FindAllToolUseCase,
    FindOneToolUseCase,
    FindByCriticActivityIdToolUseCase,
    {
      provide: 'IToolService',
      useClass: ToolService
    },
    {
      provide: IToolStorageAdapter,
      useClass: ToolStorageAdapter
    }
  ],
  exports: ['IToolService']
})
export class ToolModule {}
