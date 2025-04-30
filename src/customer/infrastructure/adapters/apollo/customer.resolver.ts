import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { CustomerService } from '../../../application/customer.service'
import { Customer } from './entities/customer.entity'
import { CreateCustomerInput } from './dto/create-customer.input'
import { UpdateCustomerInput } from './dto/update-customer.input'
import { Inject } from '@nestjs/common'
import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Role } from '@user/domain/user'
import { Roles } from '@authz/roles.decorator'

@Resolver(() => Customer)
export class CustomerResolver {
  constructor (
    private readonly customerService: CustomerService,
    @Inject('LOGGER') private readonly logger: ILogger
  ) {
    this.logger.setTraceContext('CustomerResolver')
  }

  @Roles(Role.SUPERADMIN)
  @Mutation(() => Customer, {
    name: 'createCustomer', 
    description: 'Provision service: create a new customer with default user Admin by email input' })
  createCustomer (@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
    this.logger.debug('[createCustomer] Requesting to create new customer...')
    return this.customerService.create(createCustomerInput)
  }

  @Roles(Role.SUPERADMIN)
  @Query(() => [Customer], {
    name: 'allCustomers',
    description: 'Provision service: get all customers in database'
  })
  findAll () {
    this.logger.debug('[findAll] Requesting to get all customers...')
    return this.customerService.findAll()
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPERATOR)
  @Query(() => Customer, { 
    name: 'getCustomerByEmail',
    description: 'Provision service: get customer information by email' })
  findOne (@Args('email', { type: () => String }) email: string) {
    this.logger.debug(`[findOne] Requesting to get customer by email: ${email}`)
    return this.customerService.findOne(email)
  }

  @Roles(Role.SUPERADMIN)
  @Mutation(() => Customer, {
    name: 'updateCustomer',
    description: 'Provision service: update customer information by id'
  })
  updateCustomer (@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    this.logger.debug('[updateCustomer] Requesting to update customer...')
    return this.customerService.update(updateCustomerInput.id, updateCustomerInput)
  }

  @Roles(Role.SUPERADMIN)
  @Mutation(() => Boolean, {
    name: 'removeCustomer',
    description: 'Provision service: remove customer by id, WARNING: this action will delete all data related, as Users and Devices'
  })
  removeCustomer (@Args('id', { type: () => Int }) id: number) {
    this.logger.debug(`[removeCustomer] Requesting to remove customer by id: ${id}`)
    return this.customerService.remove(id)
  }
}
