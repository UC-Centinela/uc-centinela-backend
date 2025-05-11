import { Injectable } from '@nestjs/common'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'
import { UpdateControlStrategyDTO } from '@control-strategy/domain/interfaces/control-strategy.interface'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

@Injectable()
export class UpdateControlStrategyUseCase {
  constructor(private readonly storage: IControlStrategyStorageAdapter) {}

  execute(dto: UpdateControlStrategyDTO): Promise<ControlStrategy> {
    const updated = ControlStrategy.reconstitute({ id: dto.id, ...dto.updateControlStrategy } as any)
    return this.storage.update(updated)
  }
}
