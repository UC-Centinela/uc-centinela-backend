import { IIdentityProviderService } from "@commons/domain/interfaces/identity-provider.interface"
import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { IUserStorageAdapter } from "@user/domain/interfaces/user.repository"
import { Role } from "@user/domain/user"

export class AssignRoleUseCase {
  constructor (
    private userRepository: IUserStorageAdapter,
    private idpService: IIdentityProviderService,
    private logger: ILogger
  ) {
    this.logger.setTraceContext(AssignRoleUseCase.name)
  }

  async execute (role: Role, userEmail: string) {
    const user = await this.userRepository.findOne(userEmail)
    if (!user) {
      this.logger.error(`[execute] User not found: ${userEmail}`)
      throw new Error(`User not found: ${userEmail}`)
    }
    await this.idpService.assignRole(user.idpId, role)
    const updatedUser = await this.userRepository.update(user.update({ role }))
    return updatedUser
  }
}