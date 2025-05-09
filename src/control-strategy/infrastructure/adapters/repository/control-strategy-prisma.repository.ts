import { Injectable } from '@nestjs/common'
import { IControlStrategyStorageAdapter } from '@control-strategy/domain/interfaces/control-strategy.repository'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'
import { ControlStrategyStorage } from '../prisma/control-strategy.storage'
import { mapPrismaControlStrategyToDomain } from './control-strategy.utils'

@Injectable()
export class ControlStrategyStorageAdapter implements IControlStrategyStorageAdapter {
  constructor(private readonly storage: ControlStrategyStorage) {}

  async create(entity: ControlStrategy): Promise<ControlStrategy> {
    const result = await this.storage.create({
      task: { connect: { id: entity.taskId } },
      title: entity.title
    })

    return mapPrismaControlStrategyToDomain(result)
  }

  async findAll(): Promise<ControlStrategy[]> {
    const result = await this.storage.findAll()
    return result.map(mapPrismaControlStrategyToDomain)
  }

  async findOne(id: number): Promise<ControlStrategy> {
    const result = await this.storage.findOne(id)
    return mapPrismaControlStrategyToDomain(result)
  }

  async update(entity: ControlStrategy): Promise<ControlStrategy> {
    const updated = await this.storage.update(entity.id, {
      title: entity.title
    })

    return mapPrismaControlStrategyToDomain(updated)
  }

  async delete(id: number): Promise<boolean> {
    await this.storage.delete(id)
    return true
  }
}
