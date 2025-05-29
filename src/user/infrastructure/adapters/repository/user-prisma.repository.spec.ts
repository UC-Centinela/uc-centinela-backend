import { UserStorageAdapter } from './user-prisma.repository'
import { UserStorage } from '../prisma/user.storage'
import { Role, User } from '@user/domain/user'

describe('UserStorageAdapter', () => {
  let adapter: UserStorageAdapter
  let storage: jest.Mocked<UserStorage>

  const userDB = {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    customerId: 2,
    idpId: 'auth0|abc',
    role: 'roleAdmin',
    rut: '12345678-9',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date()
  }

  const userEntity = User.reconstitute({
    ...userDB,
    role: Role.ADMIN
  })

  beforeEach(() => {
    storage = {
      user: jest.fn(),
      users: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn()
    } as any

    adapter = new UserStorageAdapter(storage)
  })

  it('should findOne', async () => {
    storage.user.mockResolvedValue(userDB)
    const result = await adapter.findOne(userDB.email)
    expect(result.email).toBe(userDB.email)
  })

  it('should return null if not found', async () => {
    storage.user.mockResolvedValue(null)
    const result = await adapter.findOne('ghost@example.com')
    expect(result).toBeNull()
  })

  it('should findOne by idpId', async () => {
    storage.users.mockResolvedValue([userDB])
    const result = await adapter.findOneByIdpId(userDB.idpId)
    expect(result.idpId).toBe(userDB.idpId)
  })

  it('should return null if idpId not found', async () => {
    storage.users.mockResolvedValue([])
    const result = await adapter.findOneByIdpId('nonexistent')
    expect(result).toBeNull()
  })

  it('should findAll with and without customerId', async () => {
    storage.users.mockResolvedValue([userDB])
    const result1 = await adapter.findAll()
    const result2 = await adapter.findAll(userDB.customerId)
    expect(result1[0].email).toBe(userDB.email)
    expect(result2[0].customerId).toBe(userDB.customerId)
  })

  it('should create a user', async () => {
    storage.createUser.mockResolvedValue(userDB)
    const result = await adapter.create(userEntity)
    expect(result.email).toBe(userEntity.email)
  })

  it('should update a user', async () => {
    storage.updateUser.mockResolvedValue(userDB)
    const result = await adapter.update(userEntity)
    expect(result.email).toBe(userEntity.email)
  })

  it('should delete a user', async () => {
    storage.deleteUser.mockResolvedValue(userDB)
    const result = await adapter.delete(userDB.email)
    expect(result).toBe(true)
  })

  it('should find users by customer', async () => {
    storage.users.mockResolvedValue([userDB])
    const result = await adapter.findUsersByCustomer(userDB.customerId)
    expect(result[0].customerId).toBe(userDB.customerId)
  })
})
