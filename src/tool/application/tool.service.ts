import { Injectable } from '@nestjs/common'
import { CreateToolUseCase } from './use_cases/create-tool.use-case'
import { DeleteToolUseCase } from './use_cases/delete-tool.use-case'
import { FindAllToolUseCase } from './use_cases/find-all-tool.use-case'
import { FindOneToolUseCase } from './use_cases/find-one-tool.use-case'
import { UpdateToolUseCase } from './use_cases/update-tool.use-case'
import { FindByCriticActivityIdToolUseCase } from './use_cases/find-by-critic-activity-id-tool.use-case'
import { IToolService, CreateToolDTO, UpdateToolDTO } from '@tool/domain/interfaces/tool.interface'
import { Tool } from '@tool/domain/tool'

@Injectable()
export class ToolService implements IToolService {
  constructor (
    private readonly createUseCase: CreateToolUseCase,
    private readonly updateUseCase: UpdateToolUseCase,
    private readonly findAllUseCase: FindAllToolUseCase,
    private readonly findOneUseCase: FindOneToolUseCase,
    private readonly deleteUseCase: DeleteToolUseCase,
    private readonly findByCriticActivityUseCase: FindByCriticActivityIdToolUseCase
  ) {}

  create (createToolDTO: CreateToolDTO): Promise<Tool> {
    return this.createUseCase.execute(createToolDTO)
  }

  findAll (): Promise<Tool[]> {
    return this.findAllUseCase.execute()
  }

  findOne (id: number): Promise<Tool> {
    return this.findOneUseCase.execute(id)
  }

  update (updateToolDTO: UpdateToolDTO): Promise<Tool> {
    return this.updateUseCase.execute(updateToolDTO)
  }

  delete (id: number): Promise<boolean> {
    return this.deleteUseCase.execute(id)
  }

  findAllByCriticActivityId (criticActivityId: number): Promise<Tool[]> {
    return this.findByCriticActivityUseCase.execute(criticActivityId)
  }
}
