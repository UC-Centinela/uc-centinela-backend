import { Inject, Injectable } from '@nestjs/common'
// Import domain interfaces
import { IUserStorageAdapter } from '@user/domain/interfaces/user.repository'
import { CreateUserDTO, IUserService, SyncUserDTO, UpdateUserDTO } from '@user/domain/interfaces/user.interface'

// Import use cases
import { CreateUserUseCase } from './use_cases/create-user.use-case'
import { UpdateUserUseCase } from './use_cases/update-user.use-case'
import { FindAllUsersUseCase } from './use_cases/find-all-users.use-case'
import { FindOneUserUseCase } from './use_cases/find-one-user.use-case'
import { DeleteUserUseCase } from './use_cases/delete-user.use-case'
import { FindUsersByCustomerUseCase } from './use_cases/find-users-by-customer.use-case'
import { SyncUserUseCase } from './use_cases/sync-user.use-case'
import { IIdentityProviderService } from '@commons/domain/interfaces/identity-provider.interface'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Role } from '@user/domain/user'
import { AssignRoleUseCase } from './use_cases/assign-role.use-case'

@Injectable()
export class UserService implements IUserService {
  private createUserUseCase: CreateUserUseCase

  private updateUserUseCase: UpdateUserUseCase

  private findAllUsersUseCase: FindAllUsersUseCase

  private findOneUserUseCase: FindOneUserUseCase

  private deleteUserUseCase: DeleteUserUseCase

  private findUsersByCustomerUseCase: FindUsersByCustomerUseCase

  private syncUserUseCase: SyncUserUseCase

  private assignRoleUseCase: AssignRoleUseCase

  constructor (
    userRepository: IUserStorageAdapter,
    @Inject('AUTH0_IDENTITY_PROVIDER_SERVICE') idpService: IIdentityProviderService,
    @Inject('LOGGER') logger: ILogger
  ) { 
    this.createUserUseCase = new CreateUserUseCase(userRepository, idpService, logger)
    this.updateUserUseCase = new UpdateUserUseCase(userRepository)
    this.findAllUsersUseCase = new FindAllUsersUseCase(userRepository)
    this.findOneUserUseCase = new FindOneUserUseCase(userRepository)
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository)
    this.findUsersByCustomerUseCase = new FindUsersByCustomerUseCase(userRepository)
    this.syncUserUseCase = new SyncUserUseCase(userRepository, logger)
    this.assignRoleUseCase = new AssignRoleUseCase(userRepository, idpService, logger)
  }

  create (createUserDTO: CreateUserDTO) {
    return this.createUserUseCase.execute(createUserDTO) 
  }

  findAll (customerId?: number) {
    return this.findAllUsersUseCase.execute(customerId)
  }

  findOne (email: string) {
    return this.findOneUserUseCase.execute(email)
  }

  update (updateUserDTO: UpdateUserDTO) {
    return this.updateUserUseCase.execute(updateUserDTO)
  }

  delete (email: string) {
    return this.deleteUserUseCase.execute(email)
  }

  findUsersByCustomer (customerId: number) {
    return this.findUsersByCustomerUseCase.execute(customerId)
  }

  syncUser (dto: SyncUserDTO) {
    return this.syncUserUseCase.execute(dto)
  }

  assignRole (role: Role, userEmail: string) {
    return this.assignRoleUseCase.execute(role, userEmail)
  }
}
