import { Injectable } from '@nestjs/common'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'
import { UpdateCriticActivityDTO } from '@critic-activity/domain/interfaces/critic-activity.interface'
import { CriticActivity } from '@critic-activity/domain/critic-activity'

@Injectable()
export class UpdateCriticActivityUseCase {
  constructor(private readonly storage: ICriticActivityStorageAdapter) {}

  execute(dto: UpdateCriticActivityDTO): Promise<CriticActivity> {
    const updated = CriticActivity.reconstitute({ id: dto.id, ...dto.updateCriticActivity } as any)
    return this.storage.update(updated)
  }
}
