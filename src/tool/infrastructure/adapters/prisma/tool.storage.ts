import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, Tool as PrismaTool } from '@prisma/client'

@Injectable()
export class ToolStorage {
  constructor (private readonly prisma: PrismaService) {}

  async createTool (data: Prisma.ToolCreateInput): Promise<PrismaTool> {
    return this.prisma.tool.create({ data })
  }

  async tools (): Promise<PrismaTool[]> {
    return this.prisma.tool.findMany()
  }

  async tool (id: number): Promise<PrismaTool> {
    return this.prisma.tool.findUnique({ where: { id } })
  }

  async updateTool (id: number, data: Prisma.ToolUpdateInput): Promise<PrismaTool> {
    return this.prisma.tool.update({ where: { id }, data })
  }

  async deleteTool (id: number): Promise<PrismaTool> {
    return this.prisma.tool.delete({ where: { id } })
  }

  async findAllByCriticActivityId (criticActivityId: number): Promise<PrismaTool[]> {
    return this.prisma.tool.findMany({ where: { criticActivityId } })
  }
}
