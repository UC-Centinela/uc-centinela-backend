import { Injectable } from '@nestjs/common'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'
import { CreateControlDTO } from '@control/domain/interfaces/control.interface'
import { Control } from '@control/domain/control'

@Injectable()
export class CreateControlUseCase {
  constructor (private readonly storage: IControlStorageAdapter) {}

  execute (dto: CreateControlDTO): Promise<Control> {
    const control = Control.create(dto)
    return this.storage.create(control)
  }
}
