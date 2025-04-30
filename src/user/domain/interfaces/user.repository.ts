import { User } from "../user"

export abstract class IUserStorageAdapter {
  abstract create (user: User): Promise<User>
  abstract update (user: User): Promise<User>
  abstract delete (email: string): Promise<boolean>
  abstract findAll (customerId?: number): Promise<User[]>
  abstract findOne (email: string): Promise<User>
  abstract findUsersByCustomer (customerId: number): Promise<User[]>
  abstract findOneByIdpId (idpId: string): Promise<User>
}