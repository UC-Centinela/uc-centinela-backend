import { Injectable } from '@nestjs/common'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'

@Injectable()
export class FindOneUndesiredEventUseCase {
  constructor(private readonly storage: IUndesiredEventStorageAdapter) {}

  execute(id: number): Promise<UndesiredEvent> {
    return this.storage.findOne(id)
  }
}
