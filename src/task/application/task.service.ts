import { Injectable } from '@nestjs/common'
import { CreateTaskUseCase } from './use_cases/create-task.use-case'
import { DeleteTaskUseCase } from './use_cases/delete-task.use-case'
import { FindAllTaskUseCase } from './use_cases/find-all-task.use-case'
import { FindOneTaskUseCase } from './use_cases/find-one-task.use-case'
import { UpdateTaskUseCase } from './use_cases/update-task.use-case'
import { FindByUserIdTaskUseCase } from './use_cases/find-by-user-id-task.use-case'
import { ITaskService, CreateTaskDTO, UpdateTaskDTO } from '@task/domain/interfaces/task.interface'
import { FindByReviewerIdTaskUseCase } from './use_cases/find-by-reviewer-id-task.use-case'
import { Task } from '@task/domain/task'

@Injectable()
export class TaskService implements ITaskService {
  constructor (
    private readonly createTask: CreateTaskUseCase,
    private readonly updateTask: UpdateTaskUseCase,
    private readonly findAllTask: FindAllTaskUseCase,
    private readonly findOneTask: FindOneTaskUseCase,
    private readonly deleteTask: DeleteTaskUseCase,
    private readonly findByUserIdTask: FindByUserIdTaskUseCase,
    private readonly findByReviewerIdTask: FindByReviewerIdTaskUseCase
  ) {}

  create (dto: CreateTaskDTO): Promise<Task> {
    return this.createTask.execute(dto)
  }

  findAll (): Promise<Task[]> {
    return this.findAllTask.execute()
  }

  findOne (id: number): Promise<Task> {
    return this.findOneTask.execute(id)
  }

  update (dto: UpdateTaskDTO): Promise<Task> {
    return this.updateTask.execute(dto)
  }

  delete (id: number): Promise<boolean> {
    return this.deleteTask.execute(id)
  }

  findAllByUserId (userId: number): Promise<Task[]> {
    return this.findByUserIdTask.execute(userId)
  }

  findAllByReviewerId (revisorId: number): Promise<Task[]> {
    return this.findByReviewerIdTask.execute(revisorId)
  }
}
