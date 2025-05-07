import { Injectable } from '@nestjs/common'
import { ICriticActivityService, CreateCriticActivityDTO, UpdateCriticActivityDTO } from '@critic-activity/domain/interfaces/critic-activity.interface'
import { CriticActivity } from '@critic-activity/domain/critic-activity'
import { CreateCriticActivityUseCase } from './use_cases/create-critic-activity.use-case'
import { UpdateCriticActivityUseCase } from './use_cases/update-critic-activity.use-case'
import { FindAllCriticActivityUseCase } from './use_cases/find-all-critic-activity.use-case'
import { FindOneCriticActivityUseCase } from './use_cases/find-one-critic-activity.use-case'
import { DeleteCriticActivityUseCase } from './use_cases/delete-critic-activity.use-case'
import { FindByTaskIdCriticActivityUseCase } from './use_cases/find-by-task-id-critic-activity.use-case'


@Injectable()
export class CriticActivityService implements ICriticActivityService {
  constructor(
    private readonly createUC: CreateCriticActivityUseCase,
    private readonly updateUC: UpdateCriticActivityUseCase,
    private readonly findAllUC: FindAllCriticActivityUseCase,
    private readonly findOneUC: FindOneCriticActivityUseCase,
    private readonly deleteUC: DeleteCriticActivityUseCase,
    private readonly findByTaskUC: FindByTaskIdCriticActivityUseCase
  ) {}

  create(dto: CreateCriticActivityDTO): Promise<CriticActivity> {
    return this.createUC.execute(dto)
  }

  findAll(): Promise<CriticActivity[]> {
    return this.findAllUC.execute()
  }

  findOne(id: number): Promise<CriticActivity> {
    return this.findOneUC.execute(id)
  }

  update(dto: UpdateCriticActivityDTO): Promise<CriticActivity> {
    return this.updateUC.execute(dto)
  }

  delete(id: number): Promise<boolean> {
    return this.deleteUC.execute(id)
  }

  findAllByTaskId(taskId: number): Promise<CriticActivity[]> {
    return this.findByTaskUC.execute(taskId)
  }
  
}
