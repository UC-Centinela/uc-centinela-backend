import { Injectable } from '@nestjs/common'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'
import { CreateControlStrategyDTO } from '@control-strategy/domain/interfaces/control-strategy.interface'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

@Injectable()
export class CreateControlStrategyUseCase {
  constructor (private readonly storage: IControlStrategyStorageAdapter) {}

  execute (dto: CreateControlStrategyDTO): Promise<ControlStrategy> {
    const entity = ControlStrategy.create(dto)
    return this.storage.create(entity)
  }
}
