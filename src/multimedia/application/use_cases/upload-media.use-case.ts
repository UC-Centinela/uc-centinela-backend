import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Multimedia } from '@multimedia/domain/multimedia'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { IStorageService } from '@multimedia/domain/interfaces/storage.interface'
import { IAudioExtractorService } from '@multimedia/domain/interfaces/audio-extractor.interface'
import { ITranscriptionService } from '@multimedia/domain/interfaces/transcription.interface'
import { CreateMultimediaDTO } from '@multimedia/domain/interfaces/multimedia.interface'

export interface UploadVideoDTO {
  taskId: number
  videoBuffer: Buffer
  filename: string
  mimetype: string
}

@Injectable()
export class UploadMediaUseCase {
  constructor (
    @Inject('LOGGER') private readonly logger: ILogger,
    private readonly multimediaRepository: IMultimediaStorageAdapter,
    @Inject('STORAGE_SERVICE') private readonly storageService: IStorageService,
    @Inject('AUDIO_EXTRACTOR_SERVICE') private readonly audioExtractorService: IAudioExtractorService,
    @Inject('TRANSCRIPTION_SERVICE') private readonly transcriptionService: ITranscriptionService
  ) {
    this.logger.setTraceContext(UploadMediaUseCase.name)
  }

  async execute (dto: UploadVideoDTO): Promise<Multimedia> {
    this.logger.debug(`[execute] Inicio mutación con archivo: ${dto.filename}`)

    try {
      const videoUrl = await this.storageService.uploadFile(dto.videoBuffer, dto.filename, dto.mimetype)
      const multimedia = Multimedia.create({
        taskId: dto.taskId,
        videoUrl
      })

      const saved = await this.multimediaRepository.create(multimedia)
      this.processAudioAndTranscription(dto.videoBuffer, saved)
      return saved
    } catch (error) {
      this.logger.error(`[execute] Error al subir video: ${error.message}`)
      throw new Error(`Error al subir video: ${error.message}`)
    }
  }

  private async processAudioAndTranscription (videoBuffer: Buffer, multimedia: Multimedia): Promise<void> {
    try {
      const audioBuffers = await this.audioExtractorService.extractAudio(videoBuffer, 'mp3')
      let transcription = ''

      for (const buffer of audioBuffers) {
        const text = await this.transcriptionService.transcribe(buffer)
        transcription += text.trim() + ' '
      }

      const updated = multimedia.update({ audioTranscription: transcription.trim() })
      await this.multimediaRepository.update(updated)
    } catch (error) {
      this.logger.error(`[processAudioAndTranscription] Error: ${error.message}`)
    }
  }
}
