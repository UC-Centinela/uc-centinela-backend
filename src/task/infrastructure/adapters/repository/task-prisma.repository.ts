import { Injectable } from '@nestjs/common'
import { ITaskStorageAdapter } from '@task/domain/interfaces/task.repository'
import { Task } from '@task/domain/task'
import { TaskStorage } from '../prisma/task.storage'
import { mapPrismaTaskToDomain } from './task.utils'

@Injectable()
export class TaskStorageAdapter implements ITaskStorageAdapter {
  constructor (private readonly storage: TaskStorage) {}

  async create (task: Task): Promise<Task> {
    const created = await this.storage.createTask({
      title: task.title,
      instruction: task.instruction,
      comments: task.comments,
      state: task.state,
      changeHistory: task.changeHistory,
      assignationDate: task.assignationDate,
      requiredSendDate: task.requiredSendDate,
      creator: { connect: { id: task.creatorUserId } },
      revisor: task.revisorUserId ? { connect: { id: task.revisorUserId } } : undefined
    })

    return mapPrismaTaskToDomain(created)
  }

  async findAll (): Promise<Task[]> {
    const tasks = await this.storage.tasks()
    return tasks.map(mapPrismaTaskToDomain)
  }

  async findOne (id: number): Promise<Task> {
    const task = await this.storage.task(id)
    return mapPrismaTaskToDomain(task)
  }

  async update (task: Task): Promise<Task> {
    const updateData: any = {
      title: task.title,
      instruction: task.instruction,
      comments: task.comments,
      state: task.state,
      changeHistory: task.changeHistory,
      assignationDate: task.assignationDate,
      requiredSendDate: task.requiredSendDate,
    }

    // Solo incluimos las relaciones si los IDs están definidos
    if (task.creatorUserId) {
      updateData.creator = { connect: { id: task.creatorUserId } }
    }
    
    if (task.revisorUserId) {
      updateData.revisor = { connect: { id: task.revisorUserId } }
    }

    const updated = await this.storage.updateTask(task.id, updateData)
    return mapPrismaTaskToDomain(updated)
  }

  async delete (id: number): Promise<boolean> {
    await this.storage.deleteTask(id)
    return true
  }

  async findAllByUserId (userId: number): Promise<Task[]> {
    const result = await this.storage.findAllByUserId(userId)
    return result.map(mapPrismaTaskToDomain)
  }

  async findAllByReviewerId (revisorId: number): Promise<Task[]> {
    const tasks = await this.storage.findAllByReviewerId(revisorId)
    return tasks.map(mapPrismaTaskToDomain)
  }
}
