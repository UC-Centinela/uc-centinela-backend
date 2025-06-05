import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Multimedia } from '@multimedia/domain/multimedia'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { IStorageService } from '@multimedia/domain/interfaces/storage.interface'

export interface UploadPhotoDTO {
  taskId: number
  photoBuffer: Buffer
  filename: string
  mimetype: string
}

@Injectable()
export class UploadPhotoUseCase {
  constructor (
    @Inject('LOGGER') private readonly logger: ILogger,
    private readonly multimediaRepository: IMultimediaStorageAdapter,
    @Inject('STORAGE_SERVICE') private readonly storageService: IStorageService
  ) {
    this.logger.setTraceContext(UploadPhotoUseCase.name)
  }

  async execute (dto: UploadPhotoDTO): Promise<Multimedia> {
    this.logger.debug(`[execute] Subiendo foto: ${dto.filename}`)

    try {
      const photoUrl = await this.storageService.uploadFile(dto.photoBuffer, dto.filename, dto.mimetype)

      const multimedia = Multimedia.create({
        taskId: dto.taskId,
        photoUrl
      })

      return await this.multimediaRepository.create(multimedia)
    } catch (error) {
      this.logger.error(`[execute] Error al subir foto: ${error.message}`)
      throw new Error(`Error al subir foto: ${error.message}`)
    }
  }
}
