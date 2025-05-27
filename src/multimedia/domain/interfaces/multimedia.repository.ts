import { Multimedia } from '../multimedia'

export abstract class IMultimediaStorageAdapter {
  abstract create (multimedia: Multimedia): Promise<Multimedia>
  abstract findAll (): Promise<Multimedia[]>
  abstract findOne (id: number): Promise<Multimedia>
  abstract findByTaskId (taskId: number): Promise<Multimedia[]>
  abstract update (multimedia: Multimedia): Promise<Multimedia>
  abstract delete (id: number): Promise<boolean>
}
