import { Injectable } from '@nestjs/common'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'
import { Tool } from '@tool/domain/tool'

@Injectable()
export class FindAllToolUseCase {
  constructor (private readonly storage: IToolStorageAdapter) {}

  execute (): Promise<Tool[]> {
    return this.storage.findAll()
  }
}
