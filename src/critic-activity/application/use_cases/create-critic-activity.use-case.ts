import { Injectable } from '@nestjs/common'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'
import { CreateCriticActivityDTO } from '@critic-activity/domain/interfaces/critic-activity.interface'
import { CriticActivity } from '@critic-activity/domain/critic-activity'

@Injectable()
export class CreateCriticActivityUseCase {
  constructor (private readonly storage: ICriticActivityStorageAdapter) {}

  execute (dto: CreateCriticActivityDTO): Promise<CriticActivity> {
    const activity = CriticActivity.create(dto)
    return this.storage.create(activity)
  }
}
