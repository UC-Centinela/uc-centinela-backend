import { Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { Multimedia } from '@multimedia/domain/multimedia'

@Injectable()
export class FindByTaskIdMultimediaUseCase {
  constructor (private readonly storage: IMultimediaStorageAdapter) {}

  execute (taskId: number): Promise<Multimedia[]> {
    return this.storage.findByTaskId(taskId)
  }
}
