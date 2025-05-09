import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IControlService } from '@control/domain/interfaces/control.interface'
import { Control } from '../entities/control.entity'
import { CreateControlInput } from '../dto/create-control.input'
import { UpdateControlInput } from '../dto/update-control.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => Control)
export class ControlResolver {
  constructor (
    @Inject('IControlService') private readonly service: IControlService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('ControlResolver')
  }

  @Permissions('create:control')
  @Mutation(() => Control)
  createControl(@Args('input') input: CreateControlInput) {
    this.logger.debug('[createControl] Creating...')
    return this.service.create(input)
  }

  @Query(() => [Control])
  findAllControls() {
    this.logger.debug('[findAll] Fetching all...')
    return this.service.findAll()
  }

  @Query(() => Control)
  findControl(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id)
  }

  @Mutation(() => Control)
  updateControl(@Args('input') input: UpdateControlInput) {
    return this.service.update({ id: input.id, updateControl: input })
  }

  @Mutation(() => Boolean)
  deleteControl(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id)
  }
}
