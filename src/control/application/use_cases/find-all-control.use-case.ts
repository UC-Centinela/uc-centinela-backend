import { Injectable } from '@nestjs/common'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'
import { Control } from '@control/domain/control'

@Injectable()
export class FindAllControlUseCase {
  constructor(private readonly storage: IControlStorageAdapter) {}

  execute(): Promise<Control[]> {
    return this.storage.findAll()
  }
}
