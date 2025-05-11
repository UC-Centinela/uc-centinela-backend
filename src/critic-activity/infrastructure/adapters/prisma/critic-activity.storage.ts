import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, CriticActivity } from '@prisma/client'

@Injectable()
export class CriticActivityStorage {
  constructor (private readonly prisma: PrismaService) {}

  createCriticActivity (data: Prisma.CriticActivityCreateInput): Promise<CriticActivity> {
    return this.prisma.criticActivity.create({ data })
  }

  findAll (): Promise<CriticActivity[]> {
    return this.prisma.criticActivity.findMany()
  }

  findOne (id: number): Promise<CriticActivity> {
    return this.prisma.criticActivity.findUnique({ where: { id } })
  }

  update (id: number, data: Prisma.CriticActivityUpdateInput): Promise<CriticActivity> {
    return this.prisma.criticActivity.update({ where: { id }, data })
  }

  delete (id: number): Promise<CriticActivity> {
    return this.prisma.criticActivity.delete({ where: { id } })
  }

  findAllByTaskId (taskId: number) {
    return this.prisma.criticActivity.findMany({
      where: { taskId },
    })
  }
  
}
