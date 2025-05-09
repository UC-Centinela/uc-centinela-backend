import { Injectable } from '@nestjs/common'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

@Injectable()
export class FindOneControlStrategyUseCase {
  constructor(private readonly storage: IControlStrategyStorageAdapter) {}

  execute(id: number): Promise<ControlStrategy> {
    return this.storage.findOne(id)
  }
}
