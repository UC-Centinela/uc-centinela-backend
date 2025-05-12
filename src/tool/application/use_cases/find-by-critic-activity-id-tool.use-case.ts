import { Injectable } from '@nestjs/common'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'
import { Tool } from '@tool/domain/tool'

@Injectable()
export class FindByCriticActivityIdToolUseCase {
  constructor (private readonly storage: IToolStorageAdapter) {}

  execute (criticActivityId: number): Promise<Tool[]> {
    return this.storage.findAllByCriticActivityId(criticActivityId)
  }
}
