import { Injectable } from '@nestjs/common'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { Task } from '@task/domain/task'

@Injectable()
export class FindOneTaskUseCase {
  constructor(private readonly storage: ITaskStorageAdapter) {}

  execute(id: number): Promise<Task> {
    return this.storage.findOne(id)
  }
}
