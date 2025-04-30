import { Customer } from "customer/domain/customer"
import { ICustomerRepositoryAdapter } from "customer/domain/interfaces/customer.repository"

export class UpdateCustomerUseCase {
  constructor (private customerStorageService: ICustomerRepositoryAdapter) {}

  async execute (customerId: number, customer: Partial<Customer>): Promise<Customer> {
    return this.customerStorageService.update(customerId, customer)
  }
}