import { Injectable } from '@nestjs/common'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { Task } from '@task/domain/task'

@Injectable()
export class FindAllTaskUseCase {
  constructor (private readonly storage: ITaskStorageAdapter) {}

  execute (): Promise<Task[]> {
    return this.storage.findAll()
  }
}
