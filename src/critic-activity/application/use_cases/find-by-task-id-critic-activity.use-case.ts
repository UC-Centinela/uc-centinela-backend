import { Injectable } from '@nestjs/common'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'
import { CriticActivity } from '@critic-activity/domain/critic-activity'

@Injectable()
export class FindByTaskIdCriticActivityUseCase {
  constructor (private readonly storage: ICriticActivityStorageAdapter) {}

  execute (taskId: number): Promise<CriticActivity[]> {
    return this.storage.findAllByTaskId(taskId)
  }
}
