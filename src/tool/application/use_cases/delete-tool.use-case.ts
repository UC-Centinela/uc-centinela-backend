import { Injectable } from '@nestjs/common'
import { IToolStorageAdapter } from '@tool/domain/interfaces/tool.repository'

@Injectable()
export class DeleteToolUseCase {
  constructor (private readonly storage: IToolStorageAdapter) {}

  execute (id: number): Promise<boolean> {
    return this.storage.delete(id)
  }
}
