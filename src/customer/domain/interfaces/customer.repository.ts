import { Customer } from "../customer"

export abstract class ICustomerRepositoryAdapter {
  abstract findAll (): Promise<Customer[]>
  abstract findOne (email: string): Promise<Customer>
  abstract create (createCustomerInput: Partial<Customer>): Promise<Customer>
  abstract update (id: number, updateCustomerInput: Partial<Customer>): Promise<Customer>
  abstract remove (id: number): Promise<boolean>
}