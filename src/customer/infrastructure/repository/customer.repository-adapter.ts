import { Injectable } from "@nestjs/common"

import { Customer } from "@customer/domain/customer"
import { ICustomerRepositoryAdapter } from "@customer/domain/interfaces/customer.repository"
import { CustomerStorage } from "../adapters/prisma/customer.storage"

@Injectable()
export class CustomerStorageAdapter implements ICustomerRepositoryAdapter {
  constructor (
    private readonly customerStorage: CustomerStorage
  ) {}

  async findAll (): Promise<Customer[]> {
    const customers = await this.customerStorage.customers({})
    return customers
  }

  async findOne (email: string): Promise<Customer> {
    const customer = await this.customerStorage.customer({ email })
    return customer
  }

  async create (createCustomerInput: Customer): Promise<Customer> {
    const customer = await this.customerStorage.createCustomer({
      name: createCustomerInput.name,
      email: createCustomerInput.email,
      industry: createCustomerInput.industry,
      users: {
        create: {
          firstName: 'Admin',
          lastName: createCustomerInput.name,
          email: createCustomerInput.email
        }
      },
    })
    return customer
  }

  async update (id: number, updateCustomerInput: Customer): Promise<Customer> {
    const updatedCustomer = await this.customerStorage.updateCustomer({
      where: { id },
      data: {
        name: updateCustomerInput.name,
        email: updateCustomerInput.email,
        industry: updateCustomerInput.industry
      }
    })

    return updatedCustomer
  }

  async remove (id: number): Promise<boolean> {
    const deletedCustomer = await this.customerStorage.deleteCustomer({ id })
    if (!deletedCustomer) return false
    return true
  }
}