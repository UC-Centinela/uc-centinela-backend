import { Control } from '../control';

export abstract class IControlStorageAdapter {
  abstract create(control: Control): Promise<Control>;
  abstract findAll(): Promise<Control[]>;
  abstract findOne(id: number): Promise<Control>;
  abstract update(control: Control): Promise<Control>;
  abstract delete(id: number): Promise<boolean>;
}
