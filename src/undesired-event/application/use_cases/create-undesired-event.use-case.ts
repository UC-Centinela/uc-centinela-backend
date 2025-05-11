import { Injectable } from '@nestjs/common'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'
import { CreateUndesiredEventDTO } from '@undesired-event/domain/interfaces/undesired-event.interface'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'

@Injectable()
export class CreateUndesiredEventUseCase {
  constructor(private readonly storage: IUndesiredEventStorageAdapter) {}

  execute(dto: CreateUndesiredEventDTO): Promise<UndesiredEvent> {
    const entity = UndesiredEvent.create(dto)
    return this.storage.create(entity)
  }
}
