import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { IIdentityProviderService } from "@commons/domain/interfaces/identity-provider.interface"
import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { IUserStorageAdapter } from "@user/domain/interfaces/user.repository"
import { Role, User } from "@user/domain/user"

@Injectable()
export class AssignRoleUseCase {
  constructor (
    private readonly userRepository: IUserStorageAdapter,
    private readonly idpService: IIdentityProviderService,
    private readonly logger: ILogger
  ) {
    this.logger.setTraceContext(AssignRoleUseCase.name)
  }

  async execute (role: Role, userEmail: string): Promise<User> {
    // Validar que el rol sea válido
    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException(`Invalid role: ${role}`)
    }

    const user = await this.userRepository.findOne(userEmail)
    if (!user) {
      throw new NotFoundException(`No user with email: ${userEmail} found`)
    }

    await this.idpService.assignRole(user.idpId, role)
    const updatedUser = user.update({ role })
    return await this.userRepository.update(updatedUser)
  }
}