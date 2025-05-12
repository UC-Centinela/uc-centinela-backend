import { Injectable } from '@nestjs/common'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

@Injectable()
export class FindAllControlStrategyUseCase {
  constructor (private readonly storage: IControlStrategyStorageAdapter) {}

  execute (): Promise<ControlStrategy[]> {
    return this.storage.findAll()
  }
}
