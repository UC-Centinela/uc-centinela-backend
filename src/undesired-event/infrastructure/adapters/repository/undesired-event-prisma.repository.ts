import { Injectable } from '@nestjs/common'
import { IUndesiredEventStorageAdapter } from '@undesired-event/domain/interfaces/undesired-event.repository'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'
import { UndesiredEventStorage } from '../prisma/undesired-event.storage'
import { mapPrismaUndesiredEventToDomain } from './undesired-event.utils'

@Injectable()
export class UndesiredEventStorageAdapter implements IUndesiredEventStorageAdapter {
  constructor (private readonly storage: UndesiredEventStorage) {}

  async create (entity: UndesiredEvent): Promise<UndesiredEvent> {
    const result = await this.storage.createUndesiredEvent({
      criticActivity: { connect: { id: entity.criticActivityId } },
      title: entity.title,
      description: entity.description
    })

    return mapPrismaUndesiredEventToDomain(result)
  }

  async findAll (): Promise<UndesiredEvent[]> {
    const result = await this.storage.undesiredEvents()
    return result.map(mapPrismaUndesiredEventToDomain)
  }

  async findOne (id: number): Promise<UndesiredEvent> {
    const result = await this.storage.undesiredEvent(id)
    return mapPrismaUndesiredEventToDomain(result)
  }

  async update (entity: UndesiredEvent): Promise<UndesiredEvent> {
    const result = await this.storage.updateUndesiredEvent(entity.id, {
      title: entity.title,
      description: entity.description
    })

    return mapPrismaUndesiredEventToDomain(result)
  }

  async delete (id: number): Promise<boolean> {
    await this.storage.deleteUndesiredEvent(id)
    return true
  }

  async findAllByCriticActivityId (criticActivityId: number): Promise<UndesiredEvent[]> {
    const result = await this.storage.findAllByCriticActivityId(criticActivityId)
    return result.map(mapPrismaUndesiredEventToDomain)
  }
}
