import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IStorageService } from '@multimedia/domain/interfaces/storage.interface'
import { S3 } from 'ibm-cos-sdk'
import { config } from '@commons/infrastructure/config'

@Injectable()
export class IBMStorageAdapter implements IStorageService {
  private readonly s3Client: S3
  
  constructor(
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(IBMStorageAdapter.name)
    
    this.s3Client = new S3({
      endpoint: config.ibm.endpoint,
      apiKeyId: config.ibm.apiKey,
      serviceInstanceId: config.ibm.serviceInstanceId,
      signatureVersion: 'v4',
    })
  }
  
  async uploadFile(file: Buffer, filename: string, mimetype: string): Promise<string> {
    try {
      const bucketName = config.ibm.bucketName
      const key = `videos/${Date.now()}-${filename}`
      
      await this.s3Client.putObject({
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: mimetype,
      }).promise()
      
      // Generate URL for the uploaded file
      const url = `https://${bucketName}.${config.ibm.endpoint.replace('https://', '')}/${key}`
      this.logger.debug(`[uploadFile] File uploaded successfully: ${url}`)
      
      return url
    } catch (error) {
      this.logger.error(`[uploadFile] Error uploading file: ${error}`)
      throw new Error(`Failed to upload file: ${error.message}`)
    }
  }
  
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const bucketName = config.ibm.bucketName
      const key = fileUrl.split(`${bucketName}/`)[1]
      
      await this.s3Client.deleteObject({
        Bucket: bucketName,
        Key: key,
      }).promise()
      
      this.logger.debug(`[deleteFile] File deleted successfully: ${fileUrl}`)
    } catch (error) {
      this.logger.error(`[deleteFile] Error deleting file: ${error}`)
      throw new Error(`Failed to delete file: ${error.message}`)
    }
  }
}
