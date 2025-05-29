import { CriticActivityStorageAdapter } from './critic-activity-prisma.repository'
import { CriticActivityStorage } from '../prisma/critic-activity.storage'

jest.mock('./critic-activity.utils', () => ({
  mapPrismaCriticActivityToDomain: (data: any) => data
}))

describe('CriticActivityStorageAdapter', () => {
  let adapter: CriticActivityStorageAdapter
  let storage: jest.Mocked<CriticActivityStorage>

  const mockEntity = { id: 1, title: 'Test', taskId: 2 }

  beforeEach(() => {
    storage = {
      createCriticActivity: jest.fn().mockResolvedValue(mockEntity),
      findAll: jest.fn().mockResolvedValue([mockEntity]),
      findOne: jest.fn().mockResolvedValue(mockEntity),
      update: jest.fn().mockResolvedValue(mockEntity),
      delete: jest.fn(),
      findAllByTaskId: jest.fn().mockResolvedValue([mockEntity])
    } as any

    adapter = new CriticActivityStorageAdapter(storage)
  })

  it('should create', async () => {
    const result = await adapter.create(mockEntity as any)
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
    const result = await adapter.update(mockEntity as any)
    expect(result.title).toBe('Test')
  })

  it('should delete', async () => {
    const result = await adapter.delete(1)
    expect(result).toBe(true)
  })

  it('should findAllByTaskId', async () => {
    const result = await adapter.findAllByTaskId(2)
    expect(result[0].taskId).toBe(2)
  })
})
