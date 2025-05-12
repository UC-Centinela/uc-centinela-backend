import { CriticActivity } from '../critic-activity'

export abstract class ICriticActivityStorageAdapter {
  abstract create (activity: CriticActivity): Promise<CriticActivity>
  abstract findAll (): Promise<CriticActivity[]>
  abstract findOne (id: number): Promise<CriticActivity>
  abstract update (activity: CriticActivity): Promise<CriticActivity>
  abstract delete (id: number): Promise<boolean>
  abstract findAllByTaskId (taskId: number): Promise<CriticActivity[]>
}
