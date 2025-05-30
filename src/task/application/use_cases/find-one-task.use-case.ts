import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common'
import { Task } from '@task/domain/task'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { IUserService } from '@user/domain/interfaces/user.interface'
import { Inject } from '@nestjs/common'

@Injectable()
export class FindOneTaskUseCase {
  constructor (
    private readonly storage: ITaskStorageAdapter,
    @Inject('IUserService') private readonly userService: IUserService
  ) {}

  async execute (id: number, userEmail?: string): Promise<Task> {
    const task = await this.storage.findOne(id)
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    
    // If userEmail is provided, check access permissions
    if (userEmail) {
      const user = await this.userService.findOne(userEmail)
      
      if (!user) {
        throw new NotFoundException(`User with email ${userEmail} not found`)
      }
      
      // Check if the user is the creator or revisor of the task
      if (user.id !== task.creatorUserId && user.id !== task.revisorUserId) {
        throw new ForbiddenException('You do not have permission to access this task')
      }
    }
    
    return task
  }
}
