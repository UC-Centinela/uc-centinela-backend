import { Injectable } from '@nestjs/common'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'

@Injectable()
export class DeleteUndesiredEventUseCase {
  constructor(private readonly storage: IUndesiredEventStorageAdapter) {}

  execute(id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
