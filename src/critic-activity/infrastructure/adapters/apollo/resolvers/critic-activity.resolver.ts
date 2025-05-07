import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ICriticActivityService } from '@critic-activity/domain/interfaces/critic-activity.interface'
import { CriticActivity } from '../entities/critic-activity.entity'
import { CreateCriticActivityInput } from '../dto/create-critic-activity.input'
import { UpdateCriticActivityInput } from '../dto/update-critic-activity.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'

@Resolver(() => CriticActivity)
export class CriticActivityResolver {
  constructor(
    @Inject('ICriticActivityService') private readonly service: ICriticActivityService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('CriticActivityResolver')
  }

  @Query(() => [CriticActivity], { name: 'findAllCriticActivities' })
  findAll() {
    return this.service.findAll()
  }

  @Query(() => CriticActivity, { name: 'findCriticActivity' })
  findOne(@Args('id') id: number) {
    return this.service.findOne(id)
  }

  @Mutation(() => CriticActivity, { name: 'createCriticActivity' })
  create(@Args('input') input: CreateCriticActivityInput) {
    return this.service.create(input)
  }

  @Mutation(() => CriticActivity, { name: 'updateCriticActivity' })
  update(@Args('input') input: UpdateCriticActivityInput) {
    return this.service.update({ id: input.id, updateCriticActivity: input })
  }

  @Mutation(() => Boolean, { name: 'deleteCriticActivity' })
  delete(@Args('id') id: number) {
    return this.service.delete(id)
  }

  @Query(() => [CriticActivity], { name: 'findAllCriticActivitiesByTask' })
  findAllByTaskId(@Args('taskId') taskId: number) {
    return this.service.findAllByTaskId(taskId)
  }

}
