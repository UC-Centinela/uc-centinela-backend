import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IAudioExtractorService } from '@multimedia/domain/interfaces/audio-extractor.interface'
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { resolve4 } from 'dns'

@Injectable()
export class FFmpegAudioExtractorAdapter implements IAudioExtractorService {
  constructor(
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(FFmpegAudioExtractorAdapter.name)
  }

  async extractAudio(videoBuffer: Buffer, outputFormat: string): Promise<Buffer[]> {
    const tempDir = path.join(process.cwd(), 'temp')
    if (!fs.existsSync(tempDir)) {
      this.logger.debug(`[extractAudio] Creando carpeta temporal: ${tempDir}`)
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const id = uuidv4()
    const videoPath = path.join(tempDir, `${id}.mp4`)
    const audioPath = path.join(tempDir, `${id}.${outputFormat}`)
    fs.writeFileSync(videoPath, videoBuffer)
    this.logger.debug(`[extractAudio] Video temporal guardado: ${videoPath}`)

    await this.runFFmpegToExtract(videoPath, audioPath)
    const baseBuffers = await this.splitRecursively(audioPath, 48, 25)

    // Limpieza
    fs.unlinkSync(videoPath)
    fs.unlinkSync(audioPath)

    this.logger.debug(`[extractAudio] Finalizado. Se generaron ${baseBuffers.length} fragmentos.`)
    return baseBuffers
  }

  private async runFFmpegToExtract(videoPath: string, audioPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .outputOptions('-ab', '128k')
        .output(audioPath)
        .on('end', () => resolve())
        .on('error', err => reject(new Error(`FFmpeg error: ${err.message}`)))
        .run()
    })
  }

  private async splitRecursively(inputPath: string, maxInitialMB: number, maxFinalMB: number): Promise<Buffer[]> {
    const results: Buffer[] = []
    const sizeMB = fs.statSync(inputPath).size / (1024 * 1024)

    if (sizeMB <= maxFinalMB) {
      results.push(fs.readFileSync(inputPath))
      return results
    }

    const tempDir = path.dirname(inputPath)
    const id = uuidv4()
    const segmentDir = path.join(tempDir, `${id}_segments`)
    fs.mkdirSync(segmentDir)

    const pattern = path.join(segmentDir, 'segment_%03d.mp3')
    const segmentDuration = sizeMB > maxInitialMB ? 120 : 60

    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions('-f', 'segment', '-segment_time', segmentDuration.toString(), '-c', 'copy')
        .output(pattern)
        .on('end', () => resolve())
        .on('error', err => reject(new Error(`FFmpeg split error: ${err.message}`)))
        .run()
    })

    const files = fs.readdirSync(segmentDir).filter(f => f.endsWith('.mp3'))

    for (const file of files) {
      const partPath = path.join(segmentDir, file)
      const partSizeMB = fs.statSync(partPath).size / (1024 * 1024)

      if (partSizeMB <= maxFinalMB) {
        results.push(fs.readFileSync(partPath))
      } else {
        const subResults = await this.splitRecursively(partPath, maxInitialMB, maxFinalMB)
        results.push(...subResults)
      }

      fs.unlinkSync(partPath)
    }

    fs.rmdirSync(segmentDir)
    return results
  }
}
