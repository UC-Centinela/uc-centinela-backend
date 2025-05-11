import { VerificationQuestion } from '../verification-question'

export interface CreateVerificationQuestionDTO {
  criticActivityId: number;
  title: string;
  description?: string;
}

export interface UpdateVerificationQuestionDTO {
  id: number;
  updateVerificationQuestion: Partial<CreateVerificationQuestionDTO>;
}

export interface IVerificationQuestionService {
  create(dto: CreateVerificationQuestionDTO): Promise<VerificationQuestion>;
  findAll(): Promise<VerificationQuestion[]>;
  findOne(id: number): Promise<VerificationQuestion>;
  update(dto: UpdateVerificationQuestionDTO): Promise<VerificationQuestion>;
  delete(id: number): Promise<boolean>;
  findAllByCriticActivityId(criticActivityId: number): Promise<VerificationQuestion[]>;
}
