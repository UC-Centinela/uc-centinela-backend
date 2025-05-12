import { ControlStrategy } from '../control-strategy'

export interface CreateControlStrategyDTO {
  taskId: number;
  title: string;
}

export interface UpdateControlStrategyDTO {
  id: number;
  updateControlStrategy: Partial<CreateControlStrategyDTO>;
}

export interface IControlStrategyService {
  create(dto: CreateControlStrategyDTO): Promise<ControlStrategy>;
  findAll(): Promise<ControlStrategy[]>;
  findOne(id: number): Promise<ControlStrategy>;
  update(dto: UpdateControlStrategyDTO): Promise<ControlStrategy>;
  delete(id: number): Promise<boolean>;
}
