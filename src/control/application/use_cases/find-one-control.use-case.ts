import { Injectable } from '@nestjs/common'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'
import { Control } from '@control/domain/control'

@Injectable()
export class FindOneControlUseCase {
  constructor (private readonly storage: IControlStorageAdapter) {}

  execute (id: number): Promise<Control> {
    return this.storage.findOne(id)
  }
}
