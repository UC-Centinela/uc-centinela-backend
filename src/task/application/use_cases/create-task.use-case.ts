import { Injectable } from '@nestjs/common';
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository';
import { CreateTaskDTO } from '@task/domain/interfaces/task.interface';
import { Task } from '@task/domain/task';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly storage: ITaskStorageAdapter) {}

  execute(dto: CreateTaskDTO): Promise<Task> {
    const task = Task.create(dto);
    return this.storage.create(task);
  }
}
