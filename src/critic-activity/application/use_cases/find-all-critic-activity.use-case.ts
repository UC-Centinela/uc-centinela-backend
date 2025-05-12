import { Injectable } from '@nestjs/common'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'
import { CriticActivity } from '@critic-activity/domain/critic-activity'

@Injectable()
export class FindAllCriticActivityUseCase {
  constructor (private readonly storage: ICriticActivityStorageAdapter) {}

  execute (): Promise<CriticActivity[]> {
    return this.storage.findAll()
  }
}
