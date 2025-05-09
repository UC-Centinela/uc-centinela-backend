import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, ControlStrategy as PrismaControlStrategy } from '@prisma/client'

@Injectable()
export class ControlStrategyStorage {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ControlStrategyCreateInput): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.create({ data })
  }

  async findAll(): Promise<PrismaControlStrategy[]> {
    return this.prisma.controlStrategy.findMany()
  }

  async findOne(id: number): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.findUnique({ where: { id } })
  }

  async update(id: number, data: Prisma.ControlStrategyUpdateInput): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.update({ where: { id }, data })
  }

  async delete(id: number): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.delete({ where: { id } })
  }
}
