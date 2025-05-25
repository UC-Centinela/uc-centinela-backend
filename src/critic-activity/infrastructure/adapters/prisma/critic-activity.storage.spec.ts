import { CriticActivityStorage } from './critic-activity.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('CriticActivityStorage', () => {
  let storage: CriticActivityStorage
  let prisma: PrismaService

  const mockPrisma = {
    criticActivity: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CriticActivityStorage,
        { provide: PrismaService, useValue: mockPrisma }
      ]
    }).compile()

    storage = module.get(CriticActivityStorage)
    prisma = module.get(PrismaService)
  })

  it('should create a critic activity', async () => {
    const data = { title: 'Critic', task: { connect: { id: 1 } } }
    await storage.createCriticActivity(data)
    expect(prisma.criticActivity.create).toHaveBeenCalledWith({ data })
  })

  it('should find all critic activities', async () => {
    await storage.findAll()
    expect(prisma.criticActivity.findMany).toHaveBeenCalled()
  })

  it('should find one critic activity by id', async () => {
    await storage.findOne(5)
    expect(prisma.criticActivity.findUnique).toHaveBeenCalledWith({ where: { id: 5 } })
  })

  it('should update a critic activity', async () => {
    await storage.update(5, { title: 'Updated' })
    expect(prisma.criticActivity.update).toHaveBeenCalledWith({ where: { id: 5 }, data: { title: 'Updated' } })
  })

  it('should delete a critic activity', async () => {
    await storage.delete(5)
    expect(prisma.criticActivity.delete).toHaveBeenCalledWith({ where: { id: 5 } })
  })

  it('should find all by taskId', async () => {
    await storage.findAllByTaskId(2)
    expect(prisma.criticActivity.findMany).toHaveBeenCalledWith({ where: { taskId: 2 } })
  })
})
