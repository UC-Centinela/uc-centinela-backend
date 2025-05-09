import { Injectable } from '@nestjs/common'
import { CreateUndesiredEventUseCase } from './use_cases/create-undesired-event.use-case'
import { DeleteUndesiredEventUseCase } from './use_cases/delete-undesired-event.use-case'
import { FindAllUndesiredEventUseCase } from './use_cases/find-all-undesired-event.use-case'
import { FindOneUndesiredEventUseCase } from './use_cases/find-one-undesired-event.use-case'
import { UpdateUndesiredEventUseCase } from './use_cases/update-undesired-event.use-case'
import { FindByCriticActivityIdUndesiredEventUseCase } from './use_cases/find-by-critic-activity-id-undesired-event.use-case'
import { IUndesiredEventService, CreateUndesiredEventDTO, UpdateUndesiredEventDTO } from '@undesired-event/domain/interfaces/undesired-event.interface'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'

@Injectable()
export class UndesiredEventService implements IUndesiredEventService {
  constructor (
    private readonly createUseCase: CreateUndesiredEventUseCase,
    private readonly updateUseCase: UpdateUndesiredEventUseCase,
    private readonly findAllUseCase: FindAllUndesiredEventUseCase,
    private readonly findOneUseCase: FindOneUndesiredEventUseCase,
    private readonly deleteUseCase: DeleteUndesiredEventUseCase,
    private readonly findByCriticActivityUseCase: FindByCriticActivityIdUndesiredEventUseCase
  ) {}

  create(dto: CreateUndesiredEventDTO): Promise<UndesiredEvent> {
    return this.createUseCase.execute(dto)
  }

  findAll(): Promise<UndesiredEvent[]> {
    return this.findAllUseCase.execute()
  }

  findOne(id: number): Promise<UndesiredEvent> {
    return this.findOneUseCase.execute(id)
  }

  update(dto: UpdateUndesiredEventDTO): Promise<UndesiredEvent> {
    return this.updateUseCase.execute(dto)
  }

  delete(id: number): Promise<boolean> {
    return this.deleteUseCase.execute(id)
  }

  findAllByCriticActivityId(criticActivityId: number): Promise<UndesiredEvent[]> {
    return this.findByCriticActivityUseCase.execute(criticActivityId)
  }
}
