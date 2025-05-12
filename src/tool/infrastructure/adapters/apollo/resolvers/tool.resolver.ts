import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { IToolService } from '@tool/domain/interfaces/tool.interface'
import { Tool } from '../entities/tool.entity'
import { CreateToolInput } from '../dto/create-tool.input'
import { UpdateToolInput } from '../dto/update-tool.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => Tool)
export class ToolResolver {
  constructor (
    @Inject('IToolService') private readonly service: IToolService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('ToolResolver')
  }

  @Permissions('create:tool')
  @Mutation(() => Tool)
  createTool (@Args('input') input: CreateToolInput) {
    this.logger.debug('[createTool] Creating...')
    return this.service.create(input)
  }

  @Query(() => [Tool])
  findAllTools () {
    this.logger.debug('[findAll] Fetching all...')
    return this.service.findAll()
  }

  @Query(() => Tool)
  findTool (@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id)
  }

  @Query(() => [Tool])
  findToolsByCriticActivity (@Args('criticActivityId', { type: () => Int }) id: number) {
    return this.service.findAllByCriticActivityId(id)
  }

  @Mutation(() => Tool)
  updateTool (@Args('input') input: UpdateToolInput) {
    return this.service.update({ id: input.id, updateTool: input })
  }

  @Mutation(() => Boolean)
  deleteTool (@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id)
  }
}
