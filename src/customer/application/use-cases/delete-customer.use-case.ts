import { ICustomerRepositoryAdapter } from "customer/domain/interfaces/customer.repository"

export class DeleteCustomerUseCase {

  constructor (private customerStorageService: ICustomerRepositoryAdapter) {}

  async execute (id: number): Promise<boolean> {
    return await this.customerStorageService.remove(id)
  }
}