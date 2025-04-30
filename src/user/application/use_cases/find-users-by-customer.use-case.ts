import { NotFoundException } from "@nestjs/common"
import { IUserStorageAdapter } from "user/domain/interfaces/user.repository"
import { User } from "user/domain/user"

export class FindUsersByCustomerUseCase {

  constructor (private readonly userRepository: IUserStorageAdapter) {
  }

  async execute (customerId: number): Promise<User[]> {
    const user: User[] = await this.userRepository.findUsersByCustomer(customerId)
    if (!user) {
      throw new NotFoundException(`No user related to customerId: ${customerId} found`)
    }
    return user
  }
}