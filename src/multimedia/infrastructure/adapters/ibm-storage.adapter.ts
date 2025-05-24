import { Inject, Injectable } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IStorageService } from '@multimedia/domain/interfaces/storage.interface'
import { S3 } from 'ibm-cos-sdk'
import { config } from '@commons/infrastructure/config'

@Injectable()
export class IBMStorageAdapter implements IStorageService {
  private readonly s3Client: S3

  constructor (
    @Inject('LOGGER') private readonly logger: ILogger,
  ) {
    this.logger.setTraceContext(IBMStorageAdapter.name)

    // Extraer configuración de IBM COS
    const ibmConfig = config.ibm
    const endpoint = ibmConfig.endpoint
    const apiKeyId = ibmConfig.apiKey
    const serviceInstanceId = ibmConfig.serviceInstanceId
    const ibmAuthEndpoint = ibmConfig.ibmAuthEndpoint
    const region = ibmConfig.region

    // Inicializar cliente S3 con autenticación IAM
    this.s3Client = new S3({
      endpoint,
      ibmAuthEndpoint,
      apiKeyId,
      serviceInstanceId,
      signatureVersion: 'iam',
      region,
    })

  }

  async uploadFile (
    file: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<string> {
    const bucketName = config.ibm.bucketName
    const key = `videos/${Date.now()}-${filename}`

    try {
      await this.s3Client.putObject({
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: mimetype,
      }).promise()

      const host = config.ibm.endpoint.replace(/^https?:\/\//, '')
      const url = `https://${bucketName}.${host}/${key}`
      this.logger.debug(`[uploadFile] Uploaded to: ${url}`)
      return url
    } catch (error: any) {
      this.logger.error(`[uploadFile] Error: ${error.message}`)
      throw new Error(`Failed to upload file: ${error.message}`)
    }
  }

  async deleteFile (fileUrl: string): Promise<void> {
    const bucketName = config.ibm.bucketName
    const key = fileUrl.split(`${bucketName}/`)[1]

    try {
      await this.s3Client.deleteObject({
        Bucket: bucketName,
        Key: key,
      }).promise()
      this.logger.debug(`[deleteFile] Deleted: ${fileUrl}`)
    } catch (error: any) {
      this.logger.error(`[deleteFile] Error: ${error.message}`)
      throw new Error(`Failed to delete file: ${error.message}`)
    }
  }
}
