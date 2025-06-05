import { Inject, Injectable } from '@nestjs/common'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { IStorageService } from '@multimedia/domain/interfaces/storage.interface'

@Injectable()
export class DeleteMultimediaUseCase {
  constructor (
    private readonly storage: IMultimediaStorageAdapter,
    @Inject('STORAGE_SERVICE') private readonly storageService: IStorageService,
  ) {}

  async execute (id: number): Promise<boolean> {
    const multimedia = await this.storage.findOne(id)

    if (multimedia.photoUrl) {
      await this.storageService.deleteFile(multimedia.photoUrl)
    }

    if (multimedia.videoUrl) {
      await this.storageService.deleteFile(multimedia.videoUrl)
    }
    
    return this.storage.delete(id)
  }
}
