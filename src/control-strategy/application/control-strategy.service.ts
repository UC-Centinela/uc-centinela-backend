import { Injectable } from '@nestjs/common'
import { CreateControlStrategyUseCase } from './use_cases/create-control-strategy.use-case'
import { DeleteControlStrategyUseCase } from './use_cases/delete-control-strategy.use-case'
import { FindAllControlStrategyUseCase } from './use_cases/find-all-control-strategy.use-case'
import { FindOneControlStrategyUseCase } from './use_cases/find-one-control-strategy.use-case'
import { UpdateControlStrategyUseCase } from './use_cases/update-control-strategy.use-case'
import { IControlStrategyService, CreateControlStrategyDTO, UpdateControlStrategyDTO } from '@control-strategy/domain/interfaces/control-strategy.interface'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

@Injectable()
export class ControlStrategyService implements IControlStrategyService {
  constructor (
    private readonly createUseCase: CreateControlStrategyUseCase,
    private readonly updateUseCase: UpdateControlStrategyUseCase,
    private readonly findAllUseCase: FindAllControlStrategyUseCase,
    private readonly findOneUseCase: FindOneControlStrategyUseCase,
    private readonly deleteUseCase: DeleteControlStrategyUseCase
  ) {}

  create(dto: CreateControlStrategyDTO): Promise<ControlStrategy> {
    return this.createUseCase.execute(dto)
  }

  findAll(): Promise<ControlStrategy[]> {
    return this.findAllUseCase.execute()
  }

  findOne(id: number): Promise<ControlStrategy> {
    return this.findOneUseCase.execute(id)
  }

  update(dto: UpdateControlStrategyDTO): Promise<ControlStrategy> {
    return this.updateUseCase.execute(dto)
  }

  delete(id: number): Promise<boolean> {
    return this.deleteUseCase.execute(id)
  }
}
