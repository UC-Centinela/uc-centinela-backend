import { Module } from '@nestjs/common'
import { CommonsModule } from '@commons/infrastructure/commons.module'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { MultimediaService } from '@multimedia/application/multimedia.service'
import { MultimediaResolver } from './adapters/apollo/resolvers/multimedia.resolver'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { MultimediaStorageAdapter } from './adapters/repository/multimedia-prisma.repository'
import { MultimediaStorage } from './adapters/prisma/multimedia.storage'

import { CreateMultimediaUseCase } from '@multimedia/application/use_cases/create-multimedia.use-case'
import { UpdateMultimediaUseCase } from '@multimedia/application/use_cases/update-multimedia.use-case'
import { DeleteMultimediaUseCase } from '@multimedia/application/use_cases/delete-multimedia.use-case'
import { FindAllMultimediaUseCase } from '@multimedia/application/use_cases/find-all-multimedia.use-case'
import { FindOneMultimediaUseCase } from '@multimedia/application/use_cases/find-one-multimedia.use-case'

@Module({
  imports: [CommonsModule],
  providers: [
    PrismaService,
    MultimediaStorage,
    MultimediaStorageAdapter,
    MultimediaResolver,
    CreateMultimediaUseCase,
    UpdateMultimediaUseCase,
    DeleteMultimediaUseCase,
    FindAllMultimediaUseCase,
    FindOneMultimediaUseCase,
    {
      provide: 'IMultimediaService',
      useClass: MultimediaService
    },
    {
      provide: IMultimediaStorageAdapter,
      useClass: MultimediaStorageAdapter
    }
  ],
  exports: ['IMultimediaService']
})
export class MultimediaModule {}
