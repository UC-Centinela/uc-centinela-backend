import { VerificationQuestion } from '../verification-question';

export abstract class IVerificationQuestionStorageAdapter {
  abstract create(item: VerificationQuestion): Promise<VerificationQuestion>;
  abstract findAll(): Promise<VerificationQuestion[]>;
  abstract findOne(id: number): Promise<VerificationQuestion>;
  abstract update(item: VerificationQuestion): Promise<VerificationQuestion>;
  abstract delete(id: number): Promise<boolean>;
  abstract findAllByCriticActivityId(criticActivityId: number): Promise<VerificationQuestion[]>;
}
