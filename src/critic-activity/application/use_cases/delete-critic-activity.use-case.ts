import { Injectable } from '@nestjs/common'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'

@Injectable()
export class DeleteCriticActivityUseCase {
  constructor(private readonly storage: ICriticActivityStorageAdapter) {}

  execute(id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
