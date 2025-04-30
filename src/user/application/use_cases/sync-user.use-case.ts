// src/user/application/use-cases/sync-user.use-case.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@user/domain/user'
import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { SyncUserDTO } from '@user/domain/interfaces/user.interface'
import { ILogger } from '@commons/domain/interfaces/logger.interface'

@Injectable()
export class SyncUserUseCase {
  constructor (
    private readonly userRepository: IUserStorageAdapter,
    private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(SyncUserUseCase.name)
  }

  async execute (dto: SyncUserDTO): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneByIdpId(dto.idpId)

      if (!existingUser) {
        this.logger.debug(`[execute] User does not exist in database: ${dto.idpId}`)
        throw new NotFoundException(`User with idpId ${dto.idpId} not found in database`)
      }

      if (existingUser &&
        existingUser.lastLogin &&
        existingUser.lastLogin.getTime() < new Date().getTime()) {
        const updatedUser = existingUser.update({
          lastLogin: new Date(),
        })
        return await this.userRepository.update(updatedUser)
      }
      this.logger.debug(`[execute] User exists in database: ${JSON.stringify(existingUser, null, 2)}`)
      return existingUser

    } catch (error) {
      throw new Error(`Failed to sync user with Auth0 ID ${dto.idpId} ${error}`)
    }
  }
}