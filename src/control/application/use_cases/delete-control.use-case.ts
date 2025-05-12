import { Injectable } from '@nestjs/common'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'

@Injectable()
export class DeleteControlUseCase {
  constructor (private readonly storage: IControlStorageAdapter) {}

  execute (id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
