import { Test, TestingModule } from '@nestjs/testing'
import { ControlStrategyResolver } from './control-strategy.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { ControlStrategy } from '@control-strategy/domain/control-strategy'

const moduleMocker = new ModuleMocker(global)

describe('ControlStrategyResolver - flujo real', () => {
  let resolver: ControlStrategyResolver

  const mock = ControlStrategy.reconstitute({
    id: 1,
    taskId: 1,
    title: 'Protección ocular'
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlStrategyResolver],
    }).useMocker((token) => {
      if (token === 'IControlStrategyService') {
        return {
          create: jest.fn().mockResolvedValue(mock),
          findAll: jest.fn().mockResolvedValue([mock]),
          findOne: jest.fn().mockResolvedValue(mock),
          update: jest.fn().mockResolvedValue(mock),
          delete: jest.fn().mockResolvedValue(true)
        }
      }

      if (token === 'LOGGER') {
        return {
          debug: jest.fn(),
          setTraceContext: jest.fn()
        }
      }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    resolver = module.get<ControlStrategyResolver>(ControlStrategyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a control strategy', async () => {
    const input = {
      taskId: 1,
      title: 'Protección ocular'
    }

    const result = await resolver.createControlStrategy(input as any)
    expect(result).toEqual(mock)
  })

  it('should return all control strategies', async () => {
    const result = await resolver.findAllControlStrategies()
    expect(result).toEqual([mock])
  })

  it('should return one control strategy by ID', async () => {
    const result = await resolver.findControlStrategy(1)
    expect(result).toEqual(mock)
  })

  it('should update a control strategy', async () => {
    const result = await resolver.updateControlStrategy({
      id: 1,
      title: 'Nuevo título'
    } as any)
    expect(result).toEqual(mock)
  })

  it('should delete a control strategy', async () => {
    const result = await resolver.deleteControlStrategy(1)
    expect(result).toBe(true)
  })
})
