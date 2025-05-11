import { Injectable } from '@nestjs/common'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Prisma, VerificationQuestion as PrismaVerificationQuestion } from '@prisma/client'

@Injectable()
export class VerificationQuestionStorage {
  constructor (private readonly prisma: PrismaService) {}

  async createVerificationQuestion (data: Prisma.VerificationQuestionCreateInput): Promise<PrismaVerificationQuestion> {
    return this.prisma.verificationQuestion.create({ data })
  }

  async verificationQuestions (): Promise<PrismaVerificationQuestion[]> {
    return this.prisma.verificationQuestion.findMany()
  }

  async verificationQuestion (id: number): Promise<PrismaVerificationQuestion> {
    return this.prisma.verificationQuestion.findUnique({ where: { id } })
  }

  async updateVerificationQuestion (id: number, data: Prisma.VerificationQuestionUpdateInput): Promise<PrismaVerificationQuestion> {
    return this.prisma.verificationQuestion.update({ where: { id }, data })
  }

  async deleteVerificationQuestion (id: number): Promise<PrismaVerificationQuestion> {
    return this.prisma.verificationQuestion.delete({ where: { id } })
  }

  async findAllByCriticActivityId (criticActivityId: number): Promise<PrismaVerificationQuestion[]> {
    return this.prisma.verificationQuestion.findMany({ where: { criticActivityId } })
  }
}
