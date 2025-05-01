import { CriticActivity } from '../critic-activity';

export interface CreateCriticActivityDTO {
  title: string;
  taskId: number;
}

export interface UpdateCriticActivityDTO {
  id: number;
  updateCriticActivity: Partial<CreateCriticActivityDTO>;
}

export interface ICriticActivityService {
  create(dto: CreateCriticActivityDTO): Promise<CriticActivity>;
  findAll(): Promise<CriticActivity[]>;
  findOne(id: number): Promise<CriticActivity>;
  update(dto: UpdateCriticActivityDTO): Promise<CriticActivity>;
  delete(id: number): Promise<boolean>;
}
