import { UserStorage } from './user.storage'
import { PrismaService } from '@commons/infrastructure/services/prisma/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'

describe('UserStorage', () => {
  let storage: UserStorage
  let prisma: PrismaService

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserStorage,
        { provide: PrismaService, useValue: mockPrisma }
      ]
    }).compile()

    storage = module.get(UserStorage)
    prisma = module.get(PrismaService)
  })

  it('should call findUnique', async () => {
    await storage.user({ id: 1 })
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
  })

  it('should call findMany', async () => {
    const params = { skip: 0, take: 10, where: { email: { contains: '@' } } }
    await storage.users(params)
    expect(prisma.user.findMany).toHaveBeenCalledWith(expect.objectContaining(params))
  })

  it('should call create', async () => {
    const input = { email: 'test@test.com', firstName: 'A', lastName: 'B', customer: { connect: { id: 1 } } }
    await storage.createUser(input)
    expect(prisma.user.create).toHaveBeenCalledWith({ data: input })
  })

  it('should call update', async () => {
    const input = { where: { id: 1 }, data: { firstName: 'Updated' } }
    await storage.updateUser(input)
    expect(prisma.user.update).toHaveBeenCalledWith(input)
  })

  it('should call delete', async () => {
    await storage.deleteUser({ id: 1 })
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } })
  })
})
