import { Injectable } from '@nestjs/common'
import { IControlStorageAdapter } from '@control/domain/interfaces/control.repository'
import { Control } from '@control/domain/control'
import { ControlStorage } from '../prisma/control.storage'
import { mapPrismaControlToDomain } from './control.utils'

@Injectable()
export class ControlStorageAdapter implements IControlStorageAdapter {
  constructor(private readonly storage: ControlStorage) {}

  async create(entity: Control): Promise<Control> {
    const result = await this.storage.createControl({
      criticActivity: { connect: { id: entity.criticActivityId } },
      title: entity.title,
      description: entity.description
    })

    return mapPrismaControlToDomain(result)
  }

  async findAll(): Promise<Control[]> {
    const result = await this.storage.controls()
    return result.map(mapPrismaControlToDomain)
  }

  async findOne(id: number): Promise<Control> {
    const result = await this.storage.control(id)
    return mapPrismaControlToDomain(result)
  }

  async update(entity: Control): Promise<Control> {
    const updated = await this.storage.updateControl(entity.id, {
      title: entity.title,
      description: entity.description
    })

    return mapPrismaControlToDomain(updated)
  }

  async delete(id: number): Promise<boolean> {
    await this.storage.deleteControl(id)
    return true
  }
}
