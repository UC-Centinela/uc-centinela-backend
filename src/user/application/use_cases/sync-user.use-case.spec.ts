import { NotFoundException } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { Role, User } from '@user/domain/user'
import { SyncUserUseCase } from './sync-user.use-case'

describe('SyncUserUseCase', () => {
  let useCase: SyncUserUseCase
  let mockRepo: jest.Mocked<IUserStorageAdapter>
  let mockLogger: jest.Mocked<ILogger>

  const sampleUser = User.create({
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    customerId: 1,
    role: Role.ADMIN,
    idpId: 'auth0|123'
  })

  const syncUserDTO = {
    idpId: 'auth0|123',
    email: 'test@example.com',
    name: 'Test User'
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

    mockLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      setTraceContext: jest.fn()
    }

    useCase = new SyncUserUseCase(mockRepo, mockLogger)
  })

  describe('execute', () => {
    it('debería retornar usuario existente sin actualizar si no tiene lastLogin', async () => {
      mockRepo.findOneByIdpId.mockResolvedValue(sampleUser)
      mockLogger.debug.mockReturnValue(undefined)

      const result = await useCase.execute(syncUserDTO)

      expect(result).toBe(sampleUser)
      expect(mockRepo.update).not.toHaveBeenCalled()
      expect(mockLogger.debug).toHaveBeenCalledWith(`[execute] User exists in database: ${JSON.stringify(sampleUser, null, 2)}`)
    })

    it('debería actualizar lastLogin si el usuario tiene lastLogin anterior', async () => {
      const oldDate = new Date('2023-01-01')
      const userWithOldLogin = sampleUser.update({ lastLogin: oldDate })
      const updatedUser = userWithOldLogin.update({ lastLogin: expect.any(Date) })

      mockRepo.findOneByIdpId.mockResolvedValue(userWithOldLogin)
      mockRepo.update.mockResolvedValue(updatedUser)
      mockLogger.debug.mockReturnValue(undefined)

      const result = await useCase.execute(syncUserDTO)

      expect(result.lastLogin).not.toBe(oldDate)
      expect(mockRepo.update).toHaveBeenCalled()
      expect(mockLogger.debug).toHaveBeenCalledWith(`[execute] User exists in database: ${JSON.stringify(userWithOldLogin, null, 2)}`)
    })

    it('debería lanzar NotFoundException si el usuario no existe', async () => {
      mockRepo.findOneByIdpId.mockResolvedValue(null)
      mockLogger.debug.mockReturnValue(undefined)

      await expect(useCase.execute(syncUserDTO))
        .rejects
        .toThrow(new NotFoundException(`User with idpId ${syncUserDTO.idpId} not found in database`))

      expect(mockLogger.debug).toHaveBeenCalledWith(`[execute] User does not exist in database: ${syncUserDTO.idpId}`)
    })

    it('debería manejar error en actualización de lastLogin', async () => {
      const oldDate = new Date('2023-01-01')
      const userWithOldLogin = sampleUser.update({ lastLogin: oldDate })

      mockRepo.findOneByIdpId.mockResolvedValue(userWithOldLogin)
      mockRepo.update.mockRejectedValue(new Error('Database error'))
      mockLogger.debug.mockReturnValue(undefined)
      mockLogger.error.mockReturnValue(undefined)

      await expect(useCase.execute(syncUserDTO))
        .rejects
        .toThrow('Failed to update user: Database error')

      expect(mockLogger.error).toHaveBeenCalledWith('[execute] Error updating user: Error: Database error')
    })

    it('debería mantener lastLogin actual si es más reciente que la fecha actual', async () => {
      const futureDate = new Date(Date.now() + 86400000) // Mañana
      const userWithFutureLogin = sampleUser.update({ lastLogin: futureDate })

      mockRepo.findOneByIdpId.mockResolvedValue(userWithFutureLogin)
      mockLogger.debug.mockReturnValue(undefined)

      const result = await useCase.execute(syncUserDTO)

      expect(result.lastLogin).toBe(futureDate)
      expect(mockRepo.update).not.toHaveBeenCalled()
      expect(mockLogger.debug).toHaveBeenCalledWith(`[execute] User exists in database: ${JSON.stringify(userWithFutureLogin, null, 2)}`)
    })

    it('debería manejar error en findOneByIdpId', async () => {
      mockRepo.findOneByIdpId.mockRejectedValue(new Error('Database error'))
      mockLogger.debug.mockReturnValue(undefined)

      await expect(useCase.execute(syncUserDTO))
        .rejects
        .toThrow(`Failed to sync user with Auth0 ID ${syncUserDTO.idpId} Error: Database error`)
    })
  })
}) 