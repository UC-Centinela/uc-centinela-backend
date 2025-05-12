import { Injectable } from '@nestjs/common'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'
import { Tool } from '@tool/domain/tool'

@Injectable()
export class FindOneToolUseCase {
  constructor (private readonly storage: IToolStorageAdapter) {}

  execute (id: number): Promise<Tool> {
    return this.storage.findOne(id)
  }
}
