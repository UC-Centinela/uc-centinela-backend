import { Injectable } from '@nestjs/common'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { Task } from '@task/domain/task'

@Injectable()
export class FindByUserIdTaskUseCase {
  constructor (private readonly storage: ITaskStorageAdapter) {}

  execute (userId: number): Promise<Task[]> {
    return this.storage.findAllByUserId(userId)
  }
}
