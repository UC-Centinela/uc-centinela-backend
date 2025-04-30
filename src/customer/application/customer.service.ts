import { Inject, Injectable } from '@nestjs/common'
// Import domain
import { ICustomerRepositoryAdapter } from '@customer/domain/interfaces/customer.repository'
// Import infrastructure
import { CreateCustomerInput } from '@customer/infrastructure/adapters/apollo/dto/create-customer.input'
import { UpdateCustomerInput } from '@customer/infrastructure/adapters/apollo/dto/update-customer.input'
// Import use cases
import { CreateCustomerUseCase } from './use-cases/create-customer.use-case'
import { FindAllCustomerUseCase } from './use-cases/find-all-customer.use-case'
import { FindOneCustomerUseCase } from './use-cases/find-one-customer.use-case'
import { UpdateCustomerUseCase } from './use-cases/update-customer.use-case'
import { DeleteCustomerUseCase } from './use-cases/delete-customer.use-case'
import { IUserService } from '@user/domain/interfaces/user.interface'
import { ILogger } from '@commons/domain/interfaces/logger.interface'

@Injectable()
export class CustomerService {
  private createCustomerUseCase: CreateCustomerUseCase

  private findAllCustomerUseCase: FindAllCustomerUseCase

  private findOneCustomerUseCase: FindOneCustomerUseCase

  private updateCustomerUseCase: UpdateCustomerUseCase

  private removeCustomerUseCase: DeleteCustomerUseCase

  constructor (
    @Inject('ICustomerStorageAdapter')private readonly customerRepositoryAdapter: ICustomerRepositoryAdapter,
    @Inject('IUserService') private userService: IUserService,
    @Inject('LOGGER') private logger: ILogger
  ) { 
    if (!this.customerRepositoryAdapter) {
      throw new Error('ICustomerStorageAdapter must be defined')
    }

    this.createCustomerUseCase = new CreateCustomerUseCase(this.customerRepositoryAdapter, this.userService, this.logger)
    this.findOneCustomerUseCase = new FindOneCustomerUseCase(this.customerRepositoryAdapter)
    this.findAllCustomerUseCase = new FindAllCustomerUseCase(this.customerRepositoryAdapter)
    this.updateCustomerUseCase = new UpdateCustomerUseCase(this.customerRepositoryAdapter)
    this.removeCustomerUseCase = new DeleteCustomerUseCase(this.customerRepositoryAdapter)
  }

  create (createCustomerInput: CreateCustomerInput) {
    return this.createCustomerUseCase.execute(createCustomerInput)
  }

  findAll () {
    return this.findAllCustomerUseCase.execute()
  }

  findOne (email: string) {
    return this.findOneCustomerUseCase.excute(email)
  }

  update (id: number, updateCustomerInput: UpdateCustomerInput) {
    return this.updateCustomerUseCase.execute(id, updateCustomerInput)
  }

  remove (id: number) {
    return this.removeCustomerUseCase.execute(id)
  }
}
