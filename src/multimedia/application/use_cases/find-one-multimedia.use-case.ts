import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { Multimedia } from '@multimedia/domain/multimedia'

@Injectable()
export class FindOneMultimediaUseCase {
  constructor (private readonly storage: IMultimediaStorageAdapter) {}

  execute (id: number): Promise<Multimedia> {
    return this.storage.findOne(id)
  }
}
