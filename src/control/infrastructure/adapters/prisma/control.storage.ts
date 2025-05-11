import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, Control as PrismaControl } from '@prisma/client'

@Injectable()
export class ControlStorage {
  constructor (private readonly prisma: PrismaService) {}

  async createControl (data: Prisma.ControlCreateInput): Promise<PrismaControl> {
    return this.prisma.control.create({ data })
  }

  async controls (): Promise<PrismaControl[]> {
    return this.prisma.control.findMany()
  }

  async control (id: number): Promise<PrismaControl> {
    return this.prisma.control.findUnique({ where: { id } })
  }

  async updateControl (id: number, data: Prisma.ControlUpdateInput): Promise<PrismaControl> {
    return this.prisma.control.update({ where: { id }, data })
  }

  async deleteControl (id: number): Promise<PrismaControl> {
    return this.prisma.control.delete({ where: { id } })
  }
}
