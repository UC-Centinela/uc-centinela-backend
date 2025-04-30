import { IUserStorageAdapter } from "user/domain/interfaces/user.repository"
import { User } from "user/domain/user"

export class FindAllUsersUseCase {
  constructor (private readonly userRepository: IUserStorageAdapter) {}

  async execute (customerId?: number): Promise<User[]> {
    return await this.userRepository.findAll(customerId)
  }
}