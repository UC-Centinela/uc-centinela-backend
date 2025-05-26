import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, Task } from '@prisma/client'

@Injectable()
export class TaskStorage {
  constructor (private prisma: PrismaService) {}

  async createTask (data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data })
  }

  async tasks (): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async task (id: number): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id } })
  }

  async updateTask (id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data })
  }

  async deleteTask (id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } })
  }

  async findAllByUserId (userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { creatorUserId: userId } })
  }

  async findAllByReviewerId (revisorId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { revisorUserId: revisorId }
    })
  }
}
