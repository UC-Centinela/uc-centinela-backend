import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IMultimediaService } from '@multimedia/domain/interfaces/multimedia.interface'
import { Multimedia } from '../entities/multimedia.entity'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'
import { UpdateMultimediaInput } from '../dto/update-multimedia.input'
import { UploadVideoInput } from '../dto/upload-video.input'
import { UploadPhotoInput } from '../dto/upload-photo.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'
import { UploadMediaUseCase } from '@multimedia/application/use_cases/upload-media.use-case'
import { UploadPhotoUseCase } from '@multimedia/application/use_cases/upload-photo.use-case'

@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor (
    @Inject('IMultimediaService') private readonly multimediaService: IMultimediaService,
    @Inject('LOGGER') private readonly logger: ILogger,
    @Inject(UploadMediaUseCase) private readonly uploadMediaUseCase: UploadMediaUseCase,
    @Inject(UploadPhotoUseCase) private readonly uploadPhotoUseCase: UploadPhotoUseCase
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
    this.logger.debug('[findAllMultimedia] Fetching all multimedia...')
    return this.multimediaService.findAll()
  }

  @Query(() => Multimedia)
  findMultimedia (@Args('id', { type: () => Int }) id: number) {
    return this.multimediaService.findOne(id)
  }

  @Query(() => [Multimedia])
  findMultimediaByTaskId (@Args('taskId', { type: () => Int }) taskId: number) {
    this.logger.debug(`[findMultimediaByTaskId] Fetching multimedia for task: ${taskId}`)
    return this.multimediaService.findByTaskId(taskId)
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

    const buffer = Buffer.from(input.base64, 'base64')

    return this.uploadMediaUseCase.execute({
      taskId: input.taskId,
      videoBuffer: buffer,
      filename: input.filename,
      mimetype: input.mimetype
    })
  }

  @Permissions('create:multimedia')
  @Mutation(() => Multimedia)
  async uploadPhoto (@Args('input') input: UploadPhotoInput) {
    this.logger.debug('[uploadPhoto] Uploading photo for task: ' + input.taskId)

    const buffer = Buffer.from(input.base64, 'base64')

    return this.uploadPhotoUseCase.execute({
      taskId: input.taskId,
      photoBuffer: buffer,
      filename: input.filename,
      mimetype: input.mimetype
    })
  }
}
