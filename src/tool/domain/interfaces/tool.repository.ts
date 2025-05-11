import { Tool } from '../tool'

export abstract class IToolStorageAdapter {
  abstract create (tool: Tool): Promise<Tool>
  abstract findAll (): Promise<Tool[]>
  abstract findOne (id: number): Promise<Tool>
  abstract update (tool: Tool): Promise<Tool>
  abstract delete (id: number): Promise<boolean>
  abstract findAllByCriticActivityId (criticActivityId: number): Promise<Tool[]>
}
