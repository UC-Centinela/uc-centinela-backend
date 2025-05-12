import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IControlStrategyService } from '@control-strategy/domain/interfaces/control-strategy.interface'
import { ControlStrategy } from '../entities/control-strategy.entity'
import { CreateControlStrategyInput } from '../dto/create-control-strategy.input'
import { UpdateControlStrategyInput } from '../dto/update-control-strategy.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => ControlStrategy)
export class ControlStrategyResolver {
  constructor (
    @Inject('IControlStrategyService') private readonly service: IControlStrategyService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('ControlStrategyResolver')
  }

  @Permissions('create:control-strategy')
  @Mutation(() => ControlStrategy)
  createControlStrategy (@Args('input') input: CreateControlStrategyInput) {
    this.logger.debug('[createControlStrategy] Creating...')
    return this.service.create(input)
  }

  @Query(() => [ControlStrategy])
  findAllControlStrategies () {
    this.logger.debug('[findAll] Fetching all...')
    return this.service.findAll()
  }

  @Query(() => ControlStrategy)
  findControlStrategy (@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id)
  }

  @Mutation(() => ControlStrategy)
  updateControlStrategy (@Args('input') input: UpdateControlStrategyInput) {
    return this.service.update({ id: input.id, updateControlStrategy: input })
  }

  @Mutation(() => Boolean)
  deleteControlStrategy (@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id)
  }
}
