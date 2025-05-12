import { Injectable } from '@nestjs/common'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'
import { Tool } from '@tool/domain/tool'
import { ToolStorage } from '../prisma/tool.storage'
import { mapPrismaToolToDomain } from './tool.utils'

@Injectable()
export class ToolStorageAdapter implements IToolStorageAdapter {
  constructor (private readonly storage: ToolStorage) {}

  async create (entity: Tool): Promise<Tool> {
    const result = await this.storage.createTool({
      criticActivity: { connect: { id: entity.criticActivityId } },
      title: entity.title,
    })

    return mapPrismaToolToDomain(result)
  }

  async findAll (): Promise<Tool[]> {
    const result = await this.storage.tools()
    return result.map(mapPrismaToolToDomain)
  }

  async findOne (id: number): Promise<Tool> {
    const result = await this.storage.tool(id)
    return mapPrismaToolToDomain(result)
  }

  async update (entity: Tool): Promise<Tool> {
    const result = await this.storage.updateTool(entity.id, {
      title: entity.title
    })

    return mapPrismaToolToDomain(result)
  }

  async delete (id: number): Promise<boolean> {
    await this.storage.deleteTool(id)
    return true
  }

  async findAllByCriticActivityId (criticActivityId: number): Promise<Tool[]> {
    const result = await this.storage.findAllByCriticActivityId(criticActivityId)
    return result.map(mapPrismaToolToDomain)
  }
}
