import { Injectable } from '@nestjs/common'
import { CreateControlUseCase } from './use_cases/create-control.use-case'
import { DeleteControlUseCase } from './use_cases/delete-control.use-case'
import { FindAllControlUseCase } from './use_cases/find-all-control.use-case'
import { FindOneControlUseCase } from './use_cases/find-one-control.use-case'
import { UpdateControlUseCase } from './use_cases/update-control.use-case'
import { IControlService, CreateControlDTO, UpdateControlDTO } from '@control/domain/interfaces/control.interface'
import { Control } from '@control/domain/control'

@Injectable()
export class ControlService implements IControlService {
  constructor (
    private readonly createUseCase: CreateControlUseCase,
    private readonly updateUseCase: UpdateControlUseCase,
    private readonly findAllUseCase: FindAllControlUseCase,
    private readonly findOneUseCase: FindOneControlUseCase,
    private readonly deleteUseCase: DeleteControlUseCase
  ) {}

  create (dto: CreateControlDTO): Promise<Control> {
    return this.createUseCase.execute(dto)
  }

  findAll (): Promise<Control[]> {
    return this.findAllUseCase.execute()
  }

  findOne (id: number): Promise<Control> {
    return this.findOneUseCase.execute(id)
  }

  update (dto: UpdateControlDTO): Promise<Control> {
    return this.updateUseCase.execute(dto)
  }

  delete (id: number): Promise<boolean> {
    return this.deleteUseCase.execute(id)
  }
}
