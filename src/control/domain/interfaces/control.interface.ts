import { Control } from '../control';

export interface CreateControlDTO {
  criticActivityId: number;
  title: string;
  description?: string;
}

export interface UpdateControlDTO {
  id: number;
  updateControl: Partial<CreateControlDTO>;
}

export interface IControlService {
  create(dto: CreateControlDTO): Promise<Control>;
  findAll(): Promise<Control[]>;
  findOne(id: number): Promise<Control>;
  update(dto: UpdateControlDTO): Promise<Control>;
  delete(id: number): Promise<boolean>;
}
