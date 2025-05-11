import { Injectable } from '@nestjs/common'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'

@Injectable()
export class DeleteControlStrategyUseCase {
  constructor(private readonly storage: IControlStrategyStorageAdapter) {}

  execute(id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
