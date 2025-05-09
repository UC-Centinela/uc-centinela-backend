import { UndesiredEvent } from '../undesired-event';

export abstract class IUndesiredEventStorageAdapter {
  abstract create(event: UndesiredEvent): Promise<UndesiredEvent>;
  abstract findAll(): Promise<UndesiredEvent[]>;
  abstract findOne(id: number): Promise<UndesiredEvent>;
  abstract update(event: UndesiredEvent): Promise<UndesiredEvent>;
  abstract delete(id: number): Promise<boolean>;
  abstract findAllByCriticActivityId(criticActivityId: number): Promise<UndesiredEvent[]>;
}
