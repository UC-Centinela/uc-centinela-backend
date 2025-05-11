import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { CreateMultimediaDTO } from '@multimedia/domain/interfaces/multimedia.interface'
import { Multimedia } from '@multimedia/domain/multimedia'

@Injectable()
export class CreateMultimediaUseCase {
  constructor (private readonly storage: IMultimediaStorageAdapter) {}

  execute (dto: CreateMultimediaDTO): Promise<Multimedia> {
    const multimedia = Multimedia.create(dto)
    return this.storage.create(multimedia)
  }
}
