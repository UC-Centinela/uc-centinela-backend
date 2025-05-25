import { ControlStorage } from './control.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('ControlStorage', () => {
  let storage: ControlStorage
  let prisma: PrismaService

  const mockPrisma = {
    control: {
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
        ControlStorage,
        { provide: PrismaService, useValue: mockPrisma }
      ]
    }).compile()

    storage = module.get(ControlStorage)
    prisma = module.get(PrismaService)
  })

  it('should create a control', async () => {
    const data = { title: 'A', description: 'B', criticActivity: { connect: { id: 1 } } }
    await storage.createControl(data)
    expect(prisma.control.create).toHaveBeenCalledWith({ data })
  })

  it('should get all controls', async () => {
    await storage.controls()
    expect(prisma.control.findMany).toHaveBeenCalled()
  })

  it('should get one control by id', async () => {
    await storage.control(10)
    expect(prisma.control.findUnique).toHaveBeenCalledWith({ where: { id: 10 } })
  })

  it('should update a control', async () => {
    await storage.updateControl(10, { title: 'Updated' })
    expect(prisma.control.update).toHaveBeenCalledWith({ where: { id: 10 }, data: { title: 'Updated' } })
  })

  it('should delete a control', async () => {
    await storage.deleteControl(10)
    expect(prisma.control.delete).toHaveBeenCalledWith({ where: { id: 10 } })
  })
})
