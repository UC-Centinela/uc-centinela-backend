import { Injectable } from '@nestjs/common'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly storage: ITaskStorageAdapter) {}

  execute(id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
