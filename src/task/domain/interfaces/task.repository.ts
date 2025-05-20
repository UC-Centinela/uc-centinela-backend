import { Task } from '../task'

export abstract class ITaskStorageAdapter {
  abstract create (task: Task): Promise<Task>
  abstract findAll (): Promise<Task[]>
  abstract findOne (id: number): Promise<Task>
  abstract update (task: Task): Promise<Task>
  abstract delete (id: number): Promise<boolean>
  abstract findAllByUserId(userId: number): Promise<Task[]>
}
