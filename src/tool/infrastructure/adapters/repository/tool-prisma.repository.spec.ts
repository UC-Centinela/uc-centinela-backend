import { ToolStorageAdapter } from './tool-prisma.repository'
import { ToolStorage } from '../prisma/tool.storage'

jest.mock('./tool.utils', () => ({
  mapPrismaToolToDomain: (data: any) => data
}))

describe('ToolStorageAdapter', () => {
  let adapter: ToolStorageAdapter
  let storage: jest.Mocked<ToolStorage>

  const mockTool = { id: 1, title: 'Hammer', criticActivityId: 5 }

  beforeEach(() => {
    storage = {
      createTool: jest.fn().mockResolvedValue(mockTool),
      tools: jest.fn().mockResolvedValue([mockTool]),
      tool: jest.fn().mockResolvedValue(mockTool),
      updateTool: jest.fn().mockResolvedValue(mockTool),
      deleteTool: jest.fn(),
      findAllByCriticActivityId: jest.fn().mockResolvedValue([mockTool])
    } as any

    adapter = new ToolStorageAdapter(storage)
  })

  it('should create', async () => {
    const result = await adapter.create(mockTool as any)
    expect(result).toEqual(expect.objectContaining({ id: 1 }))
  })

  it('should findAll', async () => {
    const result = await adapter.findAll()
    expect(result.length).toBe(1)
  })

  it('should findOne', async () => {
    const result = await adapter.findOne(1)
    expect(result.id).toBe(1)
  })

  it('should update', async () => {
    const result = await adapter.update(mockTool as any)
    expect(result.title).toBe('Hammer')
  })

  it('should delete', async () => {
    const result = await adapter.delete(1)
    expect(result).toBe(true)
  })

  it('should findAllByCriticActivityId', async () => {
    const result = await adapter.findAllByCriticActivityId(5)
    expect(result[0].criticActivityId).toBe(5)
  })
})
