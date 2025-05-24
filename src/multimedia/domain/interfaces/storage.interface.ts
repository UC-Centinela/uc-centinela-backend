export interface IStorageService {
  uploadFile (file: Buffer, filename: string, mimetype: string): Promise<string>
  deleteFile (fileUrl: string): Promise<void>
}