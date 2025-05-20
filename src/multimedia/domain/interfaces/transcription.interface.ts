export interface ITranscriptionService {
  transcribe (audioBuffer: Buffer): Promise<string>
}