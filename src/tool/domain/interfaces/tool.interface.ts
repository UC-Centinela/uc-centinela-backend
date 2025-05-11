import { Tool } from '../tool'

export interface CreateToolDTO {
  criticActivityId: number;
  title: string;
}

export interface UpdateToolDTO {
  id: number;
  updateTool: Partial<CreateToolDTO>;
}

export interface IToolService {
  create(dto: CreateToolDTO): Promise<Tool>;
  findAll(): Promise<Tool[]>;
  findOne(id: number): Promise<Tool>;
  update(dto: UpdateToolDTO): Promise<Tool>;
  delete(id: number): Promise<boolean>;
  findAllByCriticActivityId(criticActivityId: number): Promise<Tool[]>;
}
