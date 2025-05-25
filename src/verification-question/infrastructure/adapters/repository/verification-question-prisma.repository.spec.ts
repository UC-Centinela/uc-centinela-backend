import { VerificationQuestionStorageAdapter } from './verification-question-prisma.repository'
import { VerificationQuestionStorage } from '../prisma/verification-question.storage'

jest.mock('./verification-question.utils', () => ({
  mapPrismaVerificationQuestionToDomain: (data: any) => data
}))

describe('VerificationQuestionStorageAdapter', () => {
  let adapter: VerificationQuestionStorageAdapter
  let storage: jest.Mocked<VerificationQuestionStorage>

  const mockQ = { id: 1, title: 'Q1', description: 'desc', criticActivityId: 3 }

  beforeEach(() => {
    storage = {
      createVerificationQuestion: jest.fn().mockResolvedValue(mockQ),
      verificationQuestions: jest.fn().mockResolvedValue([mockQ]),
      verificationQuestion: jest.fn().mockResolvedValue(mockQ),
      updateVerificationQuestion: jest.fn().mockResolvedValue(mockQ),
      deleteVerificationQuestion: jest.fn(),
      findAllByCriticActivityId: jest.fn().mockResolvedValue([mockQ])
    } as any

    adapter = new VerificationQuestionStorageAdapter(storage)
  })

  it('should create', async () => {
    const result = await adapter.create(mockQ as any)
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
    const result = await adapter.update(mockQ as any)
    expect(result.title).toBe('Q1')
  })

  it('should delete', async () => {
    const result = await adapter.delete(1)
    expect(result).toBe(true)
  })

  it('should findAllByCriticActivityId', async () => {
    const result = await adapter.findAllByCriticActivityId(3)
    expect(result[0].criticActivityId).toBe(3)
  })
})
