import FirestoreAdapter from './firestore'

jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn()
}))

const mockFirestore = {
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  get: jest.fn(),
  set: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  where: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis()
}

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(() => mockFirestore),
  FieldValue: {
    arrayUnion: jest.fn((val) => `union(${val})`)
  },
  FieldPath: {
    documentId: () => 'id'
  }
}))

describe('FirestoreAdapter', () => {
  let adapter: FirestoreAdapter
  const logger = { error: jest.fn() }

  beforeEach(() => {
    adapter = new FirestoreAdapter(logger as any, 'project', 'instance')
    jest.clearAllMocks()
  })

  it('getDataDocumentFromCollection - sin snapshot', async () => {
    mockFirestore.get.mockResolvedValueOnce({ exists: false })
    const res = await adapter.getDataDocumentFromCollection('coll', 'doc')
    expect(res.data).toBeNull()
  })

  it('getDocumentsFromCollection - éxito', async () => {
    mockFirestore.get.mockResolvedValueOnce({
      docs: [{ data: () => ({ id: 1 }) }]
    })
    const res = await adapter.getDocumentsFromCollection('coll')
    expect(res.data).toHaveLength(1)
  })

  it('getDocumentsFromCollection - error', async () => {
    mockFirestore.get.mockRejectedValueOnce(new Error('boom'))
    const res = await adapter.getDocumentsFromCollection('coll')
    expect(res.error).toBeDefined()
  })

  it('addDocumentToCollection con id', async () => {
    mockFirestore.set.mockResolvedValueOnce('ok')
    const res = await adapter.addDocumentToCollection('coll', 'id123', { x: 1 })
    expect(res.data).toBe('ok')
  })

  it('addDocumentToCollection sin id', async () => {
    mockFirestore.add.mockResolvedValueOnce('ok')
    const res = await adapter.addDocumentToCollection('coll', null, { x: 1 })
    expect(res.data).toBe('ok')
  })

  it('addValueInArrayFieldOfDocument - error si no existe doc', async () => {
    mockFirestore.get.mockResolvedValueOnce({ exists: false })
    await expect(adapter.addValueInArrayFieldOfDocument('a', 'b', 'f', 1)).rejects.toThrow()
  })

  it('updateDocumentField - error si doc no existe', async () => {
    mockFirestore.get.mockResolvedValueOnce({ exists: false })
    await expect(adapter.updateDocumentField('a', 'b', {})).rejects.toThrow()
  })

  it('getDocumentReference - entrega referencia', async () => {
    const res = await adapter.getDocumentReference('a', 'b')
    expect(res.data).toBeDefined()
  })

  it('getDocumentFromCollection retorna snapshot', async () => {
    const res = await adapter.getDocumentFromCollection('coll', 'doc')
    expect(res.data).toBeDefined()
  })

  it('getDocumentsWithFilters devuelve snapshot', async () => {
    mockFirestore.get.mockResolvedValueOnce('filtered-snapshot')
    const res = await adapter.getDocumentsWithFilters('coll', [{ field: 'x', operator: '==', value: 1 }])
    expect(res.data).toBe('filtered-snapshot')
  })

  it('getDocumentsFromSubCollectionWithFilters devuelve snapshot', async () => {
    mockFirestore.get.mockResolvedValueOnce('sub-filtered')
    const res = await adapter.getDocumentsFromSubCollectionWithFilters('coll', 'doc', 'sub', [{ field: 'x', operator: '==', value: 1 }])
    expect(res.data).toBe('sub-filtered')
  })

  it('getDocumentsFromSubCollectionByOrder devuelve data procesada', async () => {
    mockFirestore.get.mockResolvedValueOnce({
      docs: [{ data: () => ({ x: 1 }) }]
    })
    const res = await adapter.getDocumentsFromSubCollectionByOrder('coll', 'doc', 'sub', 'date', 'asc', 10)
    expect(res.data.length).toBe(1)
  })

  it('updateFieldValueInArrayElement actualiza elemento existente', async () => {
    mockFirestore.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({ arr: [{ a: 1 }] })
    })
    mockFirestore.update.mockResolvedValueOnce(true)

    await expect(adapter.updateFieldValueInArrayElement('coll', 'doc', 'arr', { a: 1 }, 'a', 'changed')).resolves.toBeUndefined()
  })

  it('updateFieldValueInArrayElement lanza error si no existe', async () => {
    mockFirestore.get.mockResolvedValueOnce({ exists: false })
    await expect(
      adapter.updateFieldValueInArrayElement('coll', 'doc', 'arr', {}, 'f', 'v')
    ).rejects.toThrow()
  })

  it('updateSpecificMapFieldInDocument actualiza campo completo', async () => {
    mockFirestore.get.mockResolvedValueOnce({ exists: true })
    mockFirestore.update.mockResolvedValueOnce(true)

    await adapter.updateSpecificMapFieldInDocument('coll', 'doc', 'metadata', { a: 1 })
    expect(mockFirestore.update).toHaveBeenCalledWith({ metadata: { a: 1 } })
  })

  it('updateSpecificMapFieldInDocument actualiza campo específico', async () => {
    mockFirestore.get.mockResolvedValueOnce({ exists: true })
    mockFirestore.update.mockResolvedValueOnce(true)

    await adapter.updateSpecificMapFieldInDocument('coll', 'doc', 'metadata', null, 'campo', 'valor')
    expect(mockFirestore.update).toHaveBeenCalledWith({ 'metadata.campo': 'valor' })
  })
})
