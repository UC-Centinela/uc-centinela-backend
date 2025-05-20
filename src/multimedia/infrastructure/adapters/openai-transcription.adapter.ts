import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { ITranscriptionService } from '@multimedia/domain/interfaces/transcription.interface'
import { config } from '@commons/infrastructure/config'
import axios from 'axios'
import * as FormData from 'form-data'

@Injectable()
export class OpenAITranscriptionAdapter implements ITranscriptionService {
  constructor(
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(OpenAITranscriptionAdapter.name)
  }
  
  async transcribe(audioBuffer: Buffer): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('file', audioBuffer, {
        filename: 'audio.mp3',
        contentType: 'audio/mp3',
      })
      formData.append('model', 'whisper-1')
      
      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${config.openai.apiKey}`,
          },
        }
      )
      
      this.logger.debug(`[transcribe] Transcription completed successfully`)
      return response.data.text
    } catch (error) {
      this.logger.error(`[transcribe] Error transcribing audio: ${error}`)
      throw new Error(`Failed to transcribe audio: ${error.message}`)
    }
  }
}
