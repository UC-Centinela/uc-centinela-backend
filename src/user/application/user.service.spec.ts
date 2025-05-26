import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { IIdentityProviderService } from '@commons/domain/interfaces/identity-provider.interface'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Role, User } from '@user/domain/user'

describe('UserService', () => {
  let service: UserService
  let mockRepo: jest.Mocked<IUserStorageAdapter>
  let mockIdp: jest.Mocked<IIdentityProviderService>
  let mockLogger: jest.Mocked<ILogger>

  const sampleUser = User.create({
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    customerId: 1,
    idpId: 'auth0|abc123',
    role: Role.ADMIN,
    rut: '11.111.111-1'
  })

  beforeEach(async () => {
    mockRepo = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUsersByCustomer: jest.fn(),
      findOneByIdpId: jest.fn()
    }

    mockIdp = {
      createUser: jest.fn(),
      getUser: jest.fn(),
      assignRole: jest.fn(),
      changePassword: jest.fn()
    }

    mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      setTraceContext: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUserStorageAdapter, useValue: mockRepo },
        { provide: 'AUTH0_IDENTITY_PROVIDER_SERVICE', useValue: mockIdp },
        { provide: 'LOGGER', useValue: mockLogger }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('debería estar definido', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('debería crear un usuario nuevo', async () => {
      mockRepo.findOne.mockResolvedValue(null)
      mockIdp.createUser.mockResolvedValue({
        email: 'test@example.com',
        user_id: 'auth0|abc123',
        email_verified: true,
        phone_number: '',
        phone_verified: false,
        user_metadata: {},
        app_metadata: {},
        blocked: false,
        given_name: 'Test',
        family_name: 'User',
        name: 'Test User',
        nickname: 'test',
        picture: '',
        connection: 'Username-Password-Authentication',
        password: '',
        verify_email: true,
        username: 'test'
      })
      mockRepo.create.mockResolvedValue(sampleUser)

      const result = await service.create({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        customerId: 1,
        role: Role.ADMIN
      })

      expect(result.email).toBe('test@example.com')
      expect(mockIdp.assignRole).toHaveBeenCalledWith('auth0|abc123', Role.ADMIN)
    })

    it('debería retornar usuario existente si ya tiene IDP', async () => {
      mockRepo.findOne.mockResolvedValue(sampleUser)

      const result = await service.create({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        customerId: 1,
        role: Role.ADMIN
      })

      expect(result.idpId).toBe('auth0|abc123')
      expect(mockIdp.createUser).not.toHaveBeenCalled()
    })

    it('debería actualizar usuario si no tiene IDP', async () => {
      const userWithoutIdp = sampleUser.update({ idpId: null })
      mockRepo.findOne.mockResolvedValue(userWithoutIdp)
      mockIdp.createUser.mockResolvedValue({
        email: 'test@example.com',
        user_id: 'auth0|newIdp123',
        email_verified: true,
        phone_number: '',
        phone_verified: false,
        user_metadata: {},
        app_metadata: {},
        blocked: false,
        given_name: 'Test',
        family_name: 'User',
        name: 'Test User',
        nickname: 'test',
        picture: '',
        connection: 'Username-Password-Authentication',
        password: '',
        verify_email: true,
        username: 'test'
      })
      const updatedUser = sampleUser.update({ idpId: 'auth0|newIdp123' })
      mockRepo.update.mockResolvedValue(updatedUser)

      const result = await service.create({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        customerId: 1,
        role: Role.ADMIN
      })

      expect(result.idpId).toBe('auth0|newIdp123')
    })

    it('debería lanzar error si falla creación IDP', async () => {
      mockRepo.findOne.mockResolvedValue(null)
      mockIdp.createUser.mockRejectedValue(new Error('IDP error'))

      await expect(service.create({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        customerId: 1,
        role: Role.ADMIN
      })).rejects.toThrow('IDP error')
    })
  })

  describe('findAll', () => {
    it('debería retornar todos los usuarios', async () => {
      mockRepo.findAll.mockResolvedValue([sampleUser])
      const result = await service.findAll()
      expect(result).toHaveLength(1)
    })
  })

  describe('findOne', () => {
    it('debería encontrar usuario por email', async () => {
      mockRepo.findOne.mockResolvedValue(sampleUser)
      const result = await service.findOne('test@example.com')
      expect(result.email).toBe('test@example.com')
    })
  })

  describe('update', () => {
    it('debería actualizar un usuario', async () => {
      mockRepo.findOne.mockResolvedValue(sampleUser)
      mockRepo.update.mockResolvedValue(sampleUser)

      const result = await service.update({
        email: 'test@example.com',
        updateUser: { firstName: 'Updated' }
      })

      expect(result).toBeDefined()
      expect(result.email).toBe('test@example.com')
    })
  })

  describe('delete', () => {
    it('debería eliminar un usuario', async () => {
      mockRepo.delete.mockResolvedValue(true)
      const result = await service.delete('test@example.com')
      expect(result).toBe(true)
    })
  })

  describe('findUsersByCustomer', () => {
    it('debería buscar usuarios por customerId', async () => {
      mockRepo.findUsersByCustomer.mockResolvedValue([sampleUser])
      const result = await service.findUsersByCustomer(1)
      expect(result).toHaveLength(1)
    })
  })

  describe('syncUser', () => {
    it('debería sincronizar usuario por idpId', async () => {
      mockIdp.getUser.mockResolvedValue([{
        user_id: 'auth0|123',
        email: 'sync@example.com',
        email_verified: true,
        phone_number: '',
        phone_verified: false,
        user_metadata: {},
        app_metadata: {},
        blocked: false,
        given_name: 'Sync',
        family_name: 'User',
        name: 'Sync User',
        nickname: 'sync',
        picture: '',
        connection: 'Username-Password-Authentication',
        password: '',
        verify_email: true,
        username: 'sync'
      }])
      mockRepo.findOneByIdpId.mockResolvedValue(sampleUser)
      mockRepo.update.mockResolvedValue(sampleUser)

      const result = await service.syncUser({
        idpId: 'auth0|123',
        email: 'sync@example.com',
        name: 'Sync User'
      })

      expect(result.email).toBe('test@example.com')
    })
  })

  describe('assignRole', () => {
    it('debería asignar rol a un usuario', async () => {
      mockRepo.findOne.mockResolvedValue(sampleUser)
      mockIdp.assignRole.mockResolvedValue()
      mockRepo.update.mockResolvedValue(sampleUser)

      const result = await service.assignRole(Role.ADMIN, 'test@example.com')
      expect(result.role).toBe(Role.ADMIN)
    })
  })
})
