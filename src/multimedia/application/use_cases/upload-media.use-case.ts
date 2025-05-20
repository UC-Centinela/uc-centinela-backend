import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Multimedia } from '@multimedia/domain/multimedia'
import { IMultimediaStorageAdapter } from '@multimedia/domain/interfaces/multimedia.repository'
import { IStorageService } from '@multimedia/domain/interfaces/storage.interface'
import { IAudioExtractorService } from '@multimedia/domain/interfaces/audio-extractor.interface'
import { ITranscriptionService } from '@multimedia/domain/interfaces/transcription.interface'
import { CreateMultimediaDTO } from '@multimedia/domain/interfaces/multimedia.interface'

export interface UploadVideoDTO {
  taskId: number;
  videoBuffer: Buffer;
  filename: string;
  mimetype: string;
}

@Injectable()
export class UploadMediaUseCase {
  constructor(
    @Inject('LOGGER') private readonly logger: ILogger,
    private readonly multimediaRepository: IMultimediaStorageAdapter,
    @Inject('STORAGE_SERVICE') private readonly storageService: IStorageService,
    @Inject('AUDIO_EXTRACTOR_SERVICE') private readonly audioExtractorService: IAudioExtractorService,
    @Inject('TRANSCRIPTION_SERVICE') private readonly transcriptionService: ITranscriptionService
  ) {
    this.logger.setTraceContext(UploadMediaUseCase.name)
  }

  async execute(dto: UploadVideoDTO): Promise<Multimedia> {
    try {
      // 1. Upload video to storage service
      this.logger.debug(`[execute] Uploading video to storage: ${dto.filename}`)
      const videoUrl = await this.storageService.uploadFile(
        dto.videoBuffer,
        dto.filename,
        dto.mimetype
      )

      // 2. Create initial multimedia record with video URL
      const multimediaDto: CreateMultimediaDTO = {
        taskId: dto.taskId,
        videoUrl: videoUrl
      }
      
      const multimedia = Multimedia.create(multimediaDto)
      const savedMultimedia = await this.multimediaRepository.create(multimedia)
      this.logger.debug(`[execute] Multimedia record created with ID: ${savedMultimedia.id}`)

      // 3. Process audio extraction and transcription asynchronously
      this.processAudioAndTranscription(dto.videoBuffer, savedMultimedia)

      return savedMultimedia
    } catch (error) {
      this.logger.error(`[execute] Error uploading media: ${error}`)
      throw new Error(`Failed to upload media: ${error.message}`)
    }
  }

  private async processAudioAndTranscription(videoBuffer: Buffer, multimedia: Multimedia): Promise<void> {
    try {
      // Extract audio from video
      this.logger.debug(`[processAudioAndTranscription] Extracting audio for multimedia ID: ${multimedia.id}`)
      const audioBuffer = await this.audioExtractorService.extractAudio(videoBuffer, 'mp3')
      
      // Transcribe audio using OpenAI
      this.logger.debug(`[processAudioAndTranscription] Transcribing audio for multimedia ID: ${multimedia.id}`)
      const transcription = await this.transcriptionService.transcribe(audioBuffer)
      
      // Update multimedia record with transcription
      const updatedMultimedia = multimedia.update({ audioTranscription: transcription })
      await this.multimediaRepository.update(updatedMultimedia)
      
      this.logger.debug(`[processAudioAndTranscription] Transcription completed for multimedia ID: ${multimedia.id}`)
    } catch (error) {
      this.logger.error(`[processAudioAndTranscription] Error processing audio and transcription: ${error}`)
    }
  }
}