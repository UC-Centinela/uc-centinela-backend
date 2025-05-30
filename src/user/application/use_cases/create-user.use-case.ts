import { CreateIdpUserDTO, IdpUserBody, IIdentityProviderService } from "@commons/domain/interfaces/identity-provider.interface"
import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { CreateUserDTO } from "@user/domain/interfaces/user.interface"
import { IUserStorageAdapter } from "@user/domain/interfaces/user.repository"
import { User } from "@user/domain/user"

export class CreateUserUseCase {
  constructor (
    private userRepository: IUserStorageAdapter,
    private idpService: IIdentityProviderService,
    private logger: ILogger
  ) {
    this.logger.setTraceContext(CreateUserUseCase.name)
  }

  async execute (createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(createUserDTO.email)
    
    // Caso 1: Usuario ya existe con IDP (Auth0)
    if (user && user.idpId) {
      this.logger.warn(`[execute] User already exists in database: ${user.email}`)
      this.logger.warn(`[execute] User already exists in identity provider: ${user.idpId}`)
      return user
    }

    // Caso 2: Usuario existe pero sin IDP
    if (user && !user.idpId) {
      this.logger.warn(`[execute] User exists in database but lacks idpId: ${user.email}`)

      const idpUser = await this.enroleUserInIdentityProvider(createUserDTO)
      const updatedUser = await this.userRepository.update(user.update({ idpId: idpUser.user_id, role: createUserDTO.role }))
      return updatedUser
    }

    // Producción: crear en identity provider y luego en base
    const idpUser = await this.enroleUserInIdentityProvider(createUserDTO)
    return await this.createUserInDatabase(createUserDTO, idpUser.user_id)
  }

  private async createUserInDatabase (createUserDTO: CreateUserDTO, idpId?: string): Promise<User> {
    try {
      const newUser = User.create({
        email: createUserDTO.email,
        firstName: createUserDTO.firstName,
        lastName: createUserDTO.lastName,
        customerId: createUserDTO.customerId,
        idpId: idpId,
        role: createUserDTO.role
      })
      return await this.userRepository.create(newUser)
    } catch (error) {
      this.logger.error(`[createUserInDatabase] Error creating user in database: ${error}`)
      throw new Error(error)
    }
  }

  private async createUserInIdentityProvider (createUserDTO: CreateIdpUserDTO): Promise<IdpUserBody> {
    try {
      const idpUser = await this.idpService.createUser(createUserDTO)
      return idpUser
    } catch (error) {
      this.logger.error(`[createUserInIdentityProvider] Error creating user in identity provider: ${error}`) 
      throw new Error(error)
    }
  }

  private async enroleUserInIdentityProvider (createUserDTO: CreateUserDTO): Promise<IdpUserBody> {
    const idpUser = await this.createUserInIdentityProvider({
      email: createUserDTO.email,
      name: `${createUserDTO.firstName} ${createUserDTO.lastName}`,
      given_name: createUserDTO.firstName,
      family_name: createUserDTO.lastName
    })
    this.logger.debug(`[enroleUserInIdentityProvider] Created: ${idpUser.user_id}`)

    await this.idpService.assignRole(idpUser.user_id, createUserDTO.role)
    return idpUser
  }
}
