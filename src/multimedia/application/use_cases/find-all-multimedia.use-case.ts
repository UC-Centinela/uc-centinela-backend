import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { Multimedia } from '@multimedia/domain/multimedia'

@Injectable()
export class FindAllMultimediaUseCase {
  constructor (private readonly storage: IMultimediaStorageAdapter) {}

  execute (): Promise<Multimedia[]> {
    return this.storage.findAll()
  }
}
