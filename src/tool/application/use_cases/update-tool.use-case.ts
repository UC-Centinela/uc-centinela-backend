import { Injectable } from '@nestjs/common'
import { UpdateToolDTO } from '@tool/domain/interfaces/tool.interface'
import { Tool } from '@tool/domain/tool'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'

@Injectable()
export class UpdateToolUseCase {
  constructor (private readonly storage: IToolStorageAdapter) {}

  execute (dto: UpdateToolDTO): Promise<Tool> {
    const entity = Tool.reconstitute({ id: dto.id, ...dto.updateTool } as any)
    return this.storage.update(entity)
  }
} 
