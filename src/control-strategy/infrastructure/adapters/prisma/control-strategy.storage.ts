import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, ControlStrategy as PrismaControlStrategy } from '@prisma/client'

@Injectable()
export class ControlStrategyStorage {
  constructor(private readonly prisma: PrismaService) {}

  async createControlStrategy(data: Prisma.ControlStrategyCreateInput): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.create({ data })
  }

  async controlStrategies(): Promise<PrismaControlStrategy[]> {
    return this.prisma.controlStrategy.findMany()
  }

  async controlStrategy(id: number): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.findUnique({ where: { id } })
  }

  async updateControlStrategy(id: number, data: Prisma.ControlStrategyUpdateInput): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.update({ where: { id }, data })
  }

  async deleteControlStrategy(id: number): Promise<PrismaControlStrategy> {
    return this.prisma.controlStrategy.delete({ where: { id } })
  }
}
