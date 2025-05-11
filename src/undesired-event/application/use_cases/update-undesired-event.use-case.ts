import { Injectable } from '@nestjs/common'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'
import { UpdateUndesiredEventDTO } from '@undesired-event/domain/interfaces/undesired-event.interface'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'

@Injectable()
export class UpdateUndesiredEventUseCase {
  constructor(private readonly storage: IUndesiredEventStorageAdapter) {}

  execute(dto: UpdateUndesiredEventDTO): Promise<UndesiredEvent> {
    const entity = UndesiredEvent.reconstitute({ id: dto.id, ...dto.updateUndesiredEvent } as any)
    return this.storage.update(entity)
  }
}
