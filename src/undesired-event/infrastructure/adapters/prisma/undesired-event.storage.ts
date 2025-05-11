import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, UndesiredEvent as PrismaUndesiredEvent } from '@prisma/client'

@Injectable()
export class UndesiredEventStorage {
  constructor(private readonly prisma: PrismaService) {}

  async createUndesiredEvent(data: Prisma.UndesiredEventCreateInput): Promise<PrismaUndesiredEvent> {
    return this.prisma.undesiredEvent.create({ data })
  }

  async undesiredEvents(): Promise<PrismaUndesiredEvent[]> {
    return this.prisma.undesiredEvent.findMany()
  }

  async undesiredEvent(id: number): Promise<PrismaUndesiredEvent> {
    return this.prisma.undesiredEvent.findUnique({ where: { id } })
  }

  async updateUndesiredEvent(id: number, data: Prisma.UndesiredEventUpdateInput): Promise<PrismaUndesiredEvent> {
    return this.prisma.undesiredEvent.update({ where: { id }, data })
  }

  async deleteUndesiredEvent(id: number): Promise<PrismaUndesiredEvent> {
    return this.prisma.undesiredEvent.delete({ where: { id } })
  }

  async findAllByCriticActivityId(criticActivityId: number): Promise<PrismaUndesiredEvent[]> {
    return this.prisma.undesiredEvent.findMany({ where: { criticActivityId } })
  }
}
