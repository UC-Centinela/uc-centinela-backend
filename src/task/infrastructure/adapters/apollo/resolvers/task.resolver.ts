import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { ITaskService } from '@task/domain/interfaces/task.interface'
import { Task } from '../entities/task.entity'
import { CreateTaskInput } from '../dto/create-task.input'
import { UpdateTaskInput } from '../dto/update-task.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Permissions } from '@authz/permissions.decorator'

@Resolver(() => Task)
export class TaskResolver {
  constructor (
    @Inject('ITaskService') private readonly taskService: ITaskService,
    @Inject('LOGGER') private readonly logger: ILogger,
  ) {
    this.logger.setTraceContext('TaskResolver')
  }

  @Permissions('create:task')
  @Mutation(() => Task)
  createTask (@Args('input') input: CreateTaskInput) {
    this.logger.debug('[createTask] Creating task...')
    return this.taskService.create(input)
  }

  @Query(() => [Task])
  findAllTasks () {
    this.logger.debug('[findAll] Fetching all tasks...')
    return this.taskService.findAll()
  }

  @Query(() => Task)
  findTask (@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id)
  }

  @Mutation(() => Task)
  updateTask (@Args('input') input: UpdateTaskInput) {
    return this.taskService.update({ id: input.id, updateTask: input })
  }

  @Mutation(() => Boolean)
  deleteTask (@Args('id', { type: () => Int }) id: number) {
    return this.taskService.delete(id)
  }

  @Query(() => [Task])
  findTasksByUser (@Args('userId', { type: () => Int }) userId: number) {
    return this.taskService.findAllByUserId(userId)
  }

  @Query(() => [Task])
  findTasksByReviewer (@Args('revisorId', { type: () => Int }) revisorId: number) {
    return this.taskService.findAllByReviewerId(revisorId)
  }
}
