import { Injectable } from '@nestjs/common'
import { ICriticActivityStorageAdapter } from '@critic-activity/domain/interfaces/critic-activity.repository'
import { CriticActivity } from '@critic-activity/domain/critic-activity'
import { CriticActivityStorage } from '../prisma/critic-activity.storage'
import { mapPrismaCriticActivityToDomain } from './critic-activity.utils'

@Injectable()
export class CriticActivityStorageAdapter implements ICriticActivityStorageAdapter {
  constructor (private readonly storage: CriticActivityStorage) {}

  async create (activity: CriticActivity): Promise<CriticActivity> {
    const created = await this.storage.createCriticActivity({
      title: activity.title,
      task: { connect: { id: activity.taskId } }
    })
    return mapPrismaCriticActivityToDomain(created)
  }

  async findAll (): Promise<CriticActivity[]> {
    const result = await this.storage.findAll()
    return result.map(mapPrismaCriticActivityToDomain)
  }

  async findOne (id: number): Promise<CriticActivity> {
    const result = await this.storage.findOne(id)
    return mapPrismaCriticActivityToDomain(result)
  }

  async update (activity: CriticActivity): Promise<CriticActivity> {
    const updated = await this.storage.update(activity.id, {
      title: activity.title
    })
    return mapPrismaCriticActivityToDomain(updated)
  }

  async delete (id: number): Promise<boolean> {
    await this.storage.delete(id)
    return true
  }

  async findAllByTaskId (taskId: number): Promise<CriticActivity[]> {
    const result = await this.storage.findAllByTaskId(taskId)
    return result.map(mapPrismaCriticActivityToDomain)
  }
  
}
