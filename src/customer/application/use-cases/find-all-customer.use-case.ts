import { Customer } from "customer/domain/customer"
import { ICustomerRepositoryAdapter } from "customer/domain/interfaces/customer.repository"

export class FindAllCustomerUseCase {
  constructor (private customerStorageService: ICustomerRepositoryAdapter) {}

  async execute (): Promise<Customer[]> {
    return this.customerStorageService.findAll()
  }
}