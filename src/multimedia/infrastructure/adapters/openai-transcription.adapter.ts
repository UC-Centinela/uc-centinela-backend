import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { ITranscriptionService } from '@multimedia/domain/interfaces/transcription.interface'
import { config } from '@commons/infrastructure/config'
import axios from 'axios'
import * as FormData from 'form-data'

@Injectable()
export class OpenAITranscriptionAdapter implements ITranscriptionService {
  constructor (
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(OpenAITranscriptionAdapter.name)
  }

  async transcribe (audioBuffer: Buffer): Promise<string> {
    this.logger.debug(`[transcribe] Iniciando transcripción con Whisper API...`)

    if (!audioBuffer || !Buffer.isBuffer(audioBuffer) || audioBuffer.length === 0) {
      this.logger.error(`[transcribe] Buffer de audio inválido o vacío`)
      throw new Error('Buffer de audio inválido o vacío')
    }

    try {
      const formData = new FormData()
      formData.append('file', audioBuffer, {
        filename: 'audio.mp3',
        contentType: 'audio/mp3',
      })
      formData.append('model', 'whisper-1')
      formData.append('language', 'es') // Puedes cambiar esto si lo necesitas dinámico

      this.logger.debug(`[transcribe] Enviando audio a OpenAI (${(audioBuffer.length / (1024 * 1024)).toFixed(2)} MB)`)

      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${config.openai.apiKey}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      )

      const result = response.data.text
      this.logger.debug(`[transcribe] Transcripción exitosa. Texto recibido: ${result?.slice(0, 50)}...`)

      return result
    } catch (error: any) {
      const status = error?.response?.status
      const detail = error?.response?.data
      this.logger.error(`[transcribe] Fallo en Whisper API [${status}]: ${JSON.stringify(detail)}`)

      throw new Error(`Error en transcripción Whisper: ${status} ${JSON.stringify(detail)}`)
    }
  }
}
