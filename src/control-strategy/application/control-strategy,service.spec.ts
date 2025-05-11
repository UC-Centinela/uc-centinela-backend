import { Test, TestingModule } from '@nestjs/testing'
import { ControlStrategyService } from './control-strategy.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

// Use cases
import { CreateControlStrategyUseCase } from './use_cases/create-control-strategy.use-case'
import { UpdateControlStrategyUseCase } from './use_cases/update-control-strategy.use-case'
import { DeleteControlStrategyUseCase } from './use_cases/delete-control-strategy.use-case'
import { FindAllControlStrategyUseCase } from './use_cases/find-all-control-strategy.use-case'
import { FindOneControlStrategyUseCase } from './use_cases/find-one-control-strategy.use-case'

const moduleMocker = new ModuleMocker(global)

describe('ControlStrategyService - flujo real', () => {
  let service: ControlStrategyService

  const mockControlStrategy = ControlStrategy.reconstitute({
    id: 1,
    taskId: 2,
    title: 'EPP obligatorio'
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlStrategyService],
    }).useMocker((token) => {
      if (token === CreateControlStrategyUseCase) return { execute: jest.fn().mockResolvedValue(mockControlStrategy) }
      if (token === FindAllControlStrategyUseCase) return { execute: jest.fn().mockResolvedValue([mockControlStrategy]) }
      if (token === FindOneControlStrategyUseCase) return { execute: jest.fn().mockResolvedValue(mockControlStrategy) }
      if (token === UpdateControlStrategyUseCase) return { execute: jest.fn().mockResolvedValue(mockControlStrategy) }
      if (token === DeleteControlStrategyUseCase) return { execute: jest.fn().mockResolvedValue(true) }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<ControlStrategyService>(ControlStrategyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a control strategy', async () => {
    const result = await service.create({ taskId: 2, title: 'EPP obligatorio' })
    expect(result).toEqual(mockControlStrategy)
  })

  it('should return all control strategies', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockControlStrategy])
  })

  it('should return one control strategy by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockControlStrategy)
  })

  it('should update a control strategy', async () => {
    const result = await service.update({ id: 1, updateControlStrategy: { title: 'Nuevo título' } })
    expect(result).toEqual(mockControlStrategy)
  })

  it('should delete a control strategy', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })
})
