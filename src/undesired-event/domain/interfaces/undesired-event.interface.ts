import { UndesiredEvent } from '../undesired-event';

export interface CreateUndesiredEventDTO {
  criticActivityId: number;
  title: string;
  description?: string;
}

export interface UpdateUndesiredEventDTO {
  id: number;
  updateUndesiredEvent: Partial<CreateUndesiredEventDTO>;
}

export interface IUndesiredEventService {
  create(dto: CreateUndesiredEventDTO): Promise<UndesiredEvent>;
  findAll(): Promise<UndesiredEvent[]>;
  findOne(id: number): Promise<UndesiredEvent>;
  update(dto: UpdateUndesiredEventDTO): Promise<UndesiredEvent>;
  delete(id: number): Promise<boolean>;
  findAllByCriticActivityId(criticActivityId: number): Promise<UndesiredEvent[]>;
}
