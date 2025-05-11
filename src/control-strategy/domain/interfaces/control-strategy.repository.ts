import { ControlStrategy } from '../control-strategy';

export abstract class IControlStrategyStorageAdapter {
  abstract create(controlStrategy: ControlStrategy): Promise<ControlStrategy>;
  abstract findAll(): Promise<ControlStrategy[]>;
  abstract findOne(id: number): Promise<ControlStrategy>;
  abstract update(controlStrategy: ControlStrategy): Promise<ControlStrategy>;
  abstract delete(id: number): Promise<boolean>;
}
