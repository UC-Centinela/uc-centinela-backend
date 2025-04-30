import { ICustomerRepositoryAdapter } from "customer/domain/interfaces/customer.repository"
import { Customer } from "customer/domain/customer"
import { ILogger } from "@commons/domain/interfaces/logger.interface"
import { IUserService } from "@user/domain/interfaces/user.interface"
import { Role } from "@user/domain/user"

export class CreateCustomerUseCase {
  constructor (
    private customerRepository: ICustomerRepositoryAdapter,
    private userService: IUserService,
    private logger: ILogger
  ) {
    this.logger.setTraceContext(this.constructor.name)
  }

  async execute (customer: Partial<Customer>): Promise<Customer> {
    
    try {
      const newCustomer: Customer = await this.customerRepository.create(customer)
      this.logger.debug(`[execute] Customer created: ${newCustomer.id}`)

      // Force consistency of the customer admin user creation
      const user = await this.userService.create({
        email: newCustomer.email,
        firstName: 'Admin',
        lastName: newCustomer.name,
        customerId: newCustomer.id,
        role: Role.ADMIN
      })

      this.logger.debug(`[execute] Customer admin user created: ${user.id}`)

      return newCustomer
    } catch (error) {
      this.logger.error(`[execute] Error creating customer: ${error}`)
      throw new Error(error)
    }
  }
}