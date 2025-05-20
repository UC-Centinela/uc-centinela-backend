import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IAudioExtractorService } from '@multimedia/domain/interfaces/audio-extractor.interface'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class FFmpegAudioExtractorAdapter implements IAudioExtractorService {
  constructor(
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(FFmpegAudioExtractorAdapter.name)
  }
  
  async extractAudio(videoBuffer: Buffer, outputFormat: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const tempDir = path.join(process.cwd(), 'temp')
      
      // Ensure temp directory exists
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true })
      }
      
      const videoId = uuidv4()
      const videoPath = path.join(tempDir, `${videoId}.mp4`)
      const audioPath = path.join(tempDir, `${videoId}.${outputFormat}`)
      
      // Write video buffer to temp file
      fs.writeFileSync(videoPath, videoBuffer)
      
      // Extract audio using ffmpeg
      ffmpeg(videoPath)
        .outputOptions('-ab', '128k') // audio bitrate
        .output(audioPath)
        .on('end', () => {
          this.logger.debug(`[extractAudio] Audio extraction completed: ${audioPath}`)
          
          // Read the audio file
          const audioBuffer = fs.readFileSync(audioPath)
          
          // Clean up temp files
          fs.unlinkSync(videoPath)
          fs.unlinkSync(audioPath)
          
          resolve(audioBuffer)
        })
        .on('error', (err) => {
          this.logger.error(`[extractAudio] Error extracting audio: ${err}`)
          
          // Clean up temp files if they exist
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath)
          if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath)
          
          reject(new Error(`Failed to extract audio: ${err.message}`))
        })
        .run()
    })
  }
}
