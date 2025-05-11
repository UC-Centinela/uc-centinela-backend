import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, Multimedia as PrismaMultimedia } from '@prisma/client'

@Injectable()
export class MultimediaStorage {
  constructor (private readonly prisma: PrismaService) {}

  async createMultimedia (data: Prisma.MultimediaCreateInput): Promise<PrismaMultimedia> {
    return this.prisma.multimedia.create({ data })
  }

  async getAll (): Promise<PrismaMultimedia[]> {
    return this.prisma.multimedia.findMany()
  }

  async getById (id: number): Promise<PrismaMultimedia> {
    return this.prisma.multimedia.findUnique({ where: { id } })
  }

  async updateMultimedia (id: number, data: Prisma.MultimediaUpdateInput): Promise<PrismaMultimedia> {
    return this.prisma.multimedia.update({ where: { id }, data })
  }

  async deleteMultimedia (id: number): Promise<PrismaMultimedia> {
    return this.prisma.multimedia.delete({ where: { id } })
  }
}
