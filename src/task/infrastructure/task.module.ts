import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { TaskService } from '@task/application/task.service'
import { TaskResolver } from './adapters/apollo/resolvers/task.resolver'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { TaskStorageAdapter } from './adapters/repository/task-prisma.repository'
import { TaskStorage } from './adapters/prisma/task.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'

import { CreateTaskUseCase } from '@task/application/use_cases/create-task.use-case'
import { UpdateTaskUseCase } from '@task/application/use_cases/update-task.use-case'
import { DeleteTaskUseCase } from '@task/application/use_cases/delete-task.use-case'
import { FindAllTaskUseCase } from '@task/application/use_cases/find-all-task.use-case'
import { FindOneTaskUseCase } from '@task/application/use_cases/find-one-task.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    TaskResolver,
    PrismaService,
    TaskStorage,
    TaskStorageAdapter,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    FindAllTaskUseCase,
    FindOneTaskUseCase,
    {
      provide: 'ITaskService',
      useClass: TaskService,
    },
    {
      provide: ITaskStorageAdapter,
      useClass: TaskStorageAdapter
    }
  ],
  exports: ['ITaskService']
})
export class TaskModule {}
