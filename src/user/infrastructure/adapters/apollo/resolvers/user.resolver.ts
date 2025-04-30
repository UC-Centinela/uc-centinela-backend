import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { IUserService } from '../../../../domain/interfaces/user.interface'
import { User } from '../entities/user.entity'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Role } from '@user/domain/user'
import { Permissions } from '@authz/permissions.decorator'
import { Roles } from '@authz/roles.decorator'
import { CustomerAccess } from '@authz/customer-access.decorator'
import { CurrentUser } from '@authz/user.decorator'

@Resolver(() => User)
export class UserResolver {
  constructor (
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('LOGGER') private readonly logger: ILogger,
  ) {
    this.logger.setTraceContext('UserResolver')
  }

  @Permissions('create:user')
  @CustomerAccess()
  @Mutation(() => User , {
    name: 'createUser',
    description: 'Provision service: create a new user, need to specify the customer id'
  })
  createUser (
    @Args('input') input: CreateUserInput
  ) {
    this.logger.debug('[createUser] Requesting to create user...')
    return this.userService.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      customerId: input.customerId,
      role: input.role
    })
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPERATOR, Role.GUEST)
  @Query(() => [User], { 
    name: 'allUsers',
    description: 'Provision service: get all users in the system' })
  findAll (@CurrentUser() currentUser: User) {
    this.logger.debug(`[findAll] Requesting to get all users...`)
    if (currentUser.role !== Role.SUPERADMIN) {
      return this.userService.findAll(currentUser.customerId)
    }
    return this.userService.findAll()
  }

  @Permissions('read:user')
  @Query(() => User, { 
    name: 'getUserByEmail',
    description: 'Provision service: get a user by email' })
  findOne (@Args('email', { type: () => String }) email: string) {
    this.logger.debug(`[findOne] Requesting to get user by email: ${email}`)
    return this.userService.findOne(email)
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPERATOR)
  @CustomerAccess()
  @Query(() => [User], { 
    name: 'findUsersByCustomerId',
    description: 'Provision service: get all users by customer id'
  })
  findUsersByCustomer (@Args('customerId', { type: () => Number }) customerId: number) {
    this.logger.debug(`[findUsersByCustomer] Requesting to get users by customer id: ${customerId}`)
    return this.userService.findUsersByCustomer(customerId)
  }

  @Permissions('update:user')
  @Mutation(() => User,
    { name: 'updateUser',
      description: 'Provision service: update a user, need to specify the email' })
  updateUser (@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    this.logger.debug('[updateUser] Requesting to update user...')
    return this.userService.update({
      email: updateUserInput.email,
      updateUser: {
        firstName: updateUserInput.firstName,
        lastName: updateUserInput.lastName,
        customerId: updateUserInput.customerId
      }
    })
  }

  @Permissions('delete:user')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Mutation(() => Boolean, {name: 'removeUserByEmail', description: 'Provision service: remove a user by email'})
  removeUser (@Args('email', { type: () => String }) email: string) {
    this.logger.debug(`[removeUserByEmail] Requesting to remove user by email: ${email}`)
    return this.userService.delete(email)
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Permissions('assignRole:user')
  @Mutation(() => User, { name: 'assignRole', description: 'Provision service: asign a role to a user' })
  assignRole (@Args('role', { type: () => Role }) role: Role, @Args('userEmail', { type: () => String }) userEmail: string) {
    return this.userService.assignRole(role, userEmail)
  }
}
