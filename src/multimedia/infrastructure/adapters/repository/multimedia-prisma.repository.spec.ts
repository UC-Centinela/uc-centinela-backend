import { MultimediaStorageAdapter } from './multimedia-prisma.repository'
import { MultimediaStorage } from '../prisma/multimedia.storage'

jest.mock('./multimedia.utils', () => ({
  mapPrismaMultimediaToDomain: (data: any) => data
}))

describe('MultimediaStorageAdapter', () => {
  let adapter: MultimediaStorageAdapter
  let storage: jest.Mocked<MultimediaStorage>

  const mockM = {
    id: 1,
    taskId: 4,
    photoUrl: 'photo.jpg',
    videoUrl: 'video.mp4',
    audioTranscription: 'hello world'
  }

  beforeEach(() => {
    storage = {
      createMultimedia: jest.fn().mockResolvedValue(mockM),
      getAll: jest.fn().mockResolvedValue([mockM]),
      getById: jest.fn().mockResolvedValue(mockM),
      updateMultimedia: jest.fn().mockResolvedValue(mockM),
      deleteMultimedia: jest.fn()
    } as any

    adapter = new MultimediaStorageAdapter(storage)
  })

  it('should create', async () => {
    const result = await adapter.create(mockM as any)
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
    const result = await adapter.update(mockM as any)
    expect(result.photoUrl).toBe('photo.jpg')
  })

  it('should delete', async () => {
    const result = await adapter.delete(1)
    expect(result).toBe(true)
  })
})
