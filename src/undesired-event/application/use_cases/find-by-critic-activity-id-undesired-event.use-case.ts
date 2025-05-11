import { Injectable } from '@nestjs/common'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'

@Injectable()
export class FindByCriticActivityIdUndesiredEventUseCase {
  constructor (private readonly storage: IUndesiredEventStorageAdapter) {}

  execute (criticActivityId: number): Promise<UndesiredEvent[]> {
    return this.storage.findAllByCriticActivityId(criticActivityId)
  }
}
