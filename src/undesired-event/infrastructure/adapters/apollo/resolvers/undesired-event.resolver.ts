import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IUndesiredEventService } from '@undesired-event/domain/interfaces/undesired-event.interface'
import { UndesiredEvent } from '../entities/undesired-event.entity'
import { CreateUndesiredEventInput } from '../dto/create-undesired-event.input'
import { UpdateUndesiredEventInput } from '../dto/update-undesired-event.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => UndesiredEvent)
export class UndesiredEventResolver {
  constructor (
    @Inject('IUndesiredEventService') private readonly service: IUndesiredEventService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('UndesiredEventResolver')
  }

  @Permissions('create:undesired-event')
  @Mutation(() => UndesiredEvent)
  createUndesiredEvent (@Args('input') input: CreateUndesiredEventInput) {
    this.logger.debug('[createUndesiredEvent] Creating...')
    return this.service.create(input)
  }

  @Query(() => [UndesiredEvent])
  findAllUndesiredEvents () {
    this.logger.debug('[findAll] Fetching all...')
    return this.service.findAll()
  }

  @Query(() => UndesiredEvent)
  findUndesiredEvent (@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id)
  }

  @Query(() => [UndesiredEvent])
  findUndesiredEventsByCriticActivity (@Args('criticActivityId', { type: () => Int }) id: number) {
    return this.service.findAllByCriticActivityId(id)
  }

  @Mutation(() => UndesiredEvent)
  updateUndesiredEvent (@Args('input') input: UpdateUndesiredEventInput) {
    return this.service.update({ id: input.id, updateUndesiredEvent: input })
  }

  @Mutation(() => Boolean)
  deleteUndesiredEvent (@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id)
  }
}
