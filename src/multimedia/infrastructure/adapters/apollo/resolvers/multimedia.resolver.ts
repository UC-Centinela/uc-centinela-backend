import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IMultimediaService } from '@multimedia/domain/interfaces/multimedia.interface'
import { Multimedia } from '../entities/multimedia.entity'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'
import { UpdateMultimediaInput } from '../dto/update-multimedia.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'
import { UploadVideoInput } from '../dto/upload-video.input'
import { UploadMediaUseCase } from '@multimedia/application/use_cases/upload-media.use-case'
import { FileUpload } from 'graphql-upload'

@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor (
    @Inject('IMultimediaService') private readonly multimediaService: IMultimediaService,
    @Inject('LOGGER') private readonly logger: ILogger,
    @Inject(UploadMediaUseCase) private readonly uploadMediaUseCase: UploadMediaUseCase
  ) {
    this.logger.setTraceContext('MultimediaResolver')
  }

  @Permissions('create:multimedia')
  @Mutation(() => Multimedia)
  createMultimedia (@Args('input') input: CreateMultimediaInput) {
    this.logger.debug('[createMultimedia] Creating multimedia...')
    return this.multimediaService.create(input)
  }

  @Query(() => [Multimedia])
  findAllMultimedia () {
    this.logger.debug('[findAll] Fetching all multimedia...')
    return this.multimediaService.findAll()
  }

  @Query(() => Multimedia)
  findMultimedia (@Args('id', { type: () => Int }) id: number) {
    return this.multimediaService.findOne(id)
  }

  @Mutation(() => Multimedia)
  updateMultimedia (@Args('input') input: UpdateMultimediaInput) {
    return this.multimediaService.update({ id: input.id, updateMultimedia: input })
  }

  @Mutation(() => Boolean)
  deleteMultimedia (@Args('id', { type: () => Int }) id: number) {
    return this.multimediaService.delete(id)
  }

  @Permissions('create:multimedia')
  @Mutation(() => Multimedia)
  async uploadVideo (@Args('input') input: UploadVideoInput) {
    this.logger.debug('[uploadVideo] Uploading video for task: ' + input.taskId)
    
    // Process file upload
    const { createReadStream, filename, mimetype } = await input.file
    
    // Convert stream to buffer
    const chunks = []
    const readStream = createReadStream()
    
    for await (const chunk of readStream) {
      chunks.push(chunk)
    }
    
    const buffer = Buffer.concat(chunks)
    
    // Call the upload media use case
    return this.uploadMediaUseCase.execute({
      taskId: input.taskId,
      videoBuffer: buffer,
      filename,
      mimetype
    })
  }
}
