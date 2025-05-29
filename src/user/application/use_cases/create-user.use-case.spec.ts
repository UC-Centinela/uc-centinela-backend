import { IIdentityProviderService } from '@commons/domain/interfaces/identity-provider.interface'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { Role, User } from '@user/domain/user'
import { CreateUserUseCase } from './create-user.use-case'

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase
  let mockRepo: jest.Mocked<IUserStorageAdapter>
  let mockIdp: jest.Mocked<IIdentityProviderService>
  let mockLogger: jest.Mocked<ILogger>

  const sampleUser = User.create({
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    customerId: 1,
    role: Role.ADMIN
  })

  const createUserDTO = {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    customerId: 1,
    role: Role.ADMIN
  }

  const idpUserResponse = {
    user_id: 'auth0|123',
    email: 'test@example.com',
    email_verified: true,
    phone_number: '',
    phone_verified: false,
    user_metadata: {},
    app_metadata: {},
    blocked: false,
    name: 'Test User',
    given_name: 'Test',
    family_name: 'User',
    nickname: 'test',
    picture: '',
    connection: 'Username-Password-Authentication',
    password: '',
    verify_email: true,
    username: 'test'
  }

  beforeEach(() => {
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

    useCase = new CreateUserUseCase(mockRepo, mockIdp, mockLogger)
  })

  describe('execute', () => {
    describe('Caso 1: Usuario ya existe con IDP', () => {
      it('debería retornar usuario existente si ya tiene IDP', async () => {
        const existingUser = sampleUser.update({ idpId: 'auth0|123' })
        mockRepo.findOne.mockResolvedValue(existingUser)

        const result = await useCase.execute(createUserDTO)

        expect(result).toBe(existingUser)
        expect(mockLogger.warn).toHaveBeenCalledTimes(2)
        expect(mockIdp.createUser).not.toHaveBeenCalled()
      })
    })

    describe('Caso 2: Usuario existe sin IDP', () => {
      it('debería actualizar usuario existente con nuevo IDP en producción', async () => {
        const existingUser = sampleUser.update({ idpId: null })
        const updatedUser = existingUser.update({ idpId: 'auth0|123' })
        
        mockRepo.findOne.mockResolvedValue(existingUser)
        mockIdp.createUser.mockResolvedValue(idpUserResponse)
        mockIdp.assignRole.mockResolvedValue()
        mockRepo.update.mockResolvedValue(updatedUser)

        process.env.NODE_ENV = 'production'
        const result = await useCase.execute(createUserDTO)

        expect(result.idpId).toBe('auth0|123')
        expect(mockIdp.createUser).toHaveBeenCalled()
        expect(mockIdp.assignRole).toHaveBeenCalledWith('auth0|123', Role.ADMIN)
      })

      it('debería retornar usuario sin modificar en ambiente local', async () => {
        const existingUser = sampleUser.update({ idpId: null })
        mockRepo.findOne.mockResolvedValue(existingUser)

        process.env.NODE_ENV = 'local'
        const result = await useCase.execute(createUserDTO)

        expect(result).toBe(existingUser)
        expect(mockIdp.createUser).not.toHaveBeenCalled()
      })

      it('debería manejar error en actualización de IDP', async () => {
        const existingUser = sampleUser.update({ idpId: null })
        mockRepo.findOne.mockResolvedValue(existingUser)
        mockIdp.createUser.mockRejectedValue(new Error('IDP error'))

        process.env.NODE_ENV = 'production'
        await expect(useCase.execute(createUserDTO)).rejects.toThrow('IDP error')
      })
    })

    describe('Caso 3: Usuario nuevo', () => {
      it('debería crear nuevo usuario con IDP en producción', async () => {
        mockRepo.findOne.mockResolvedValue(null)
        mockIdp.createUser.mockResolvedValue(idpUserResponse)
        mockIdp.assignRole.mockResolvedValue()
        mockRepo.create.mockResolvedValue(sampleUser.update({ idpId: 'auth0|123' }))

        process.env.NODE_ENV = 'production'
        const result = await useCase.execute(createUserDTO)

        expect(result.idpId).toBe('auth0|123')
        expect(mockIdp.createUser).toHaveBeenCalled()
        expect(mockIdp.assignRole).toHaveBeenCalledWith('auth0|123', Role.ADMIN)
        expect(mockRepo.create).toHaveBeenCalled()
      })

      it('debería manejar error en creación de IDP', async () => {
        mockRepo.findOne.mockResolvedValue(null)
        mockIdp.createUser.mockRejectedValue(new Error('IDP error'))

        process.env.NODE_ENV = 'production'
        await expect(useCase.execute(createUserDTO)).rejects.toThrow('IDP error')
      })

      it('debería manejar error en creación en base de datos', async () => {
        mockRepo.findOne.mockResolvedValue(null)
        mockIdp.createUser.mockResolvedValue(idpUserResponse)
        mockIdp.assignRole.mockResolvedValue()
        mockRepo.create.mockRejectedValue(new Error('Database error'))

        process.env.NODE_ENV = 'production'
        await expect(useCase.execute(createUserDTO)).rejects.toThrow('Database error')
      })
    })
  })
}) 