import { ControlStorageAdapter } from './control-prisma.repository'
import { ControlStorage } from '../prisma/control.storage'

jest.mock('./control.utils', () => ({
  mapPrismaControlToDomain: (data: any) => data
}))

describe('ControlStorageAdapter', () => {
  let adapter: ControlStorageAdapter
  let storage: jest.Mocked<ControlStorage>

  const mockControl = { id: 1, title: 'C', description: 'D', criticActivityId: 2 }

  beforeEach(() => {
    storage = {
      createControl: jest.fn().mockResolvedValue(mockControl),
      controls: jest.fn().mockResolvedValue([mockControl]),
      control: jest.fn().mockResolvedValue(mockControl),
      updateControl: jest.fn().mockResolvedValue(mockControl),
      deleteControl: jest.fn()
    } as any

    adapter = new ControlStorageAdapter(storage)
  })

  it('should create', async () => {
    const result = await adapter.create(mockControl as any)
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
    const result = await adapter.update(mockControl as any)
    expect(result.title).toBe('C')
  })

  it('should delete', async () => {
    const result = await adapter.delete(1)
    expect(result).toBe(true)
  })
})
