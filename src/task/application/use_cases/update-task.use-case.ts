import { Injectable } from '@nestjs/common'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { UpdateTaskDTO } from '@task/domain/interfaces/task.interface'
import { Task } from '@task/domain/task'

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly storage: ITaskStorageAdapter) {}

  execute(dto: UpdateTaskDTO): Promise<Task> {
    const task = Task.reconstitute({ id: dto.id, ...dto.updateTask } as any)
    return this.storage.update(task)
  }
}
