import { Customer } from "customer/domain/customer"
import { ICustomerRepositoryAdapter } from "customer/domain/interfaces/customer.repository"

export class FindOneCustomerUseCase {
  constructor (private customerStorageService: ICustomerRepositoryAdapter) {}

  async excute (email: string): Promise<Customer> {
    const customer = await this.customerStorageService.findOne(email)
    if (!customer) {
      throw new Error('Customer not found')
    }

    return customer

  }
}