import { Injectable } from '@nestjs/common'
import { CreateMultimediaUseCase } from './use_cases/create-multimedia.use-case'
import { DeleteMultimediaUseCase } from './use_cases/delete-multimedia.use-case'
import { FindAllMultimediaUseCase } from './use_cases/find-all-multimedia.use-case'
import { FindOneMultimediaUseCase } from './use_cases/find-one-multimedia.use-case'
import { UpdateMultimediaUseCase } from './use_cases/update-multimedia.use-case'
import { IMultimediaService, CreateMultimediaDTO, UpdateMultimediaDTO } from '@multimedia/domain/interfaces/multimedia.interface'
import { Multimedia } from '@multimedia/domain/multimedia'

@Injectable()
export class MultimediaService implements IMultimediaService {
  constructor (
    private readonly createMultimedia: CreateMultimediaUseCase,
    private readonly updateMultimedia: UpdateMultimediaUseCase,
    private readonly findAllMultimedia: FindAllMultimediaUseCase,
    private readonly findOneMultimedia: FindOneMultimediaUseCase,
    private readonly deleteMultimedia: DeleteMultimediaUseCase
  ) {}

  create (dto: CreateMultimediaDTO): Promise<Multimedia> {
    return this.createMultimedia.execute(dto)
  }

  findAll (): Promise<Multimedia[]> {
    return this.findAllMultimedia.execute()
  }

  findOne (id: number): Promise<Multimedia> {
    return this.findOneMultimedia.execute(id)
  }

  update (dto: UpdateMultimediaDTO): Promise<Multimedia> {
    return this.updateMultimedia.execute(dto)
  }

  delete (id: number): Promise<boolean> {
    return this.deleteMultimedia.execute(id)
  }
}
