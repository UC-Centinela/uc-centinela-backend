import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'

@Injectable()
export class DeleteMultimediaUseCase {
  constructor (private readonly storage: IMultimediaStorageAdapter) {}

  execute (id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
