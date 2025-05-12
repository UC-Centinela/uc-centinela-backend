import { Injectable } from '@nestjs/common'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'
import { UpdateControlDTO } from '@control/domain/interfaces/control.interface'
import { Control } from '@control/domain/control'

@Injectable()
export class UpdateControlUseCase {
  constructor (private readonly storage: IControlStorageAdapter) {}

  execute (dto: UpdateControlDTO): Promise<Control> {
    const updated = Control.reconstitute({ id: dto.id, ...dto.updateControl } as any)
    return this.storage.update(updated)
  }
}
