export interface IAudioExtractorService {
  extractAudio (videoBuffer: Buffer, outputFormat: string): Promise<Buffer>
}