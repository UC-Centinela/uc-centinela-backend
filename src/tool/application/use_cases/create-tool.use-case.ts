import { Injectable } from '@nestjs/common'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'
import { CreateToolDTO } from '@tool/domain/interfaces/tool.interface'
import { Tool } from '@tool/domain/tool'

@Injectable()
export class CreateToolUseCase {
  constructor (private readonly storage: IToolStorageAdapter) {}

  execute (dto: CreateToolDTO): Promise<Tool> {
    const entity = Tool.create(dto)
    return this.storage.create(entity)
  }
}
