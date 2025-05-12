import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IMultimediaService } from '@multimedia/domain/interfaces/multimedia.interface'
import { Multimedia } from '../entities/multimedia.entity'
import { CreateMultimediaInput } from '../dto/create-multimedia.input'
import { UpdateMultimediaInput } from '../dto/update-multimedia.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor (
    @Inject('IMultimediaService') private readonly multimediaService: IMultimediaService,
    @Inject('LOGGER') private readonly logger: ILogger
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
}
