import { Test, TestingModule } from '@nestjs/testing'
import { UndesiredEventService } from './undesired-event.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { UndesiredEvent } from '@undesired-event/domain/undesired-event'

// Use cases
import { CreateUndesiredEventUseCase } from './use_cases/create-undesired-event.use-case'
import { UpdateUndesiredEventUseCase } from './use_cases/update-undesired-event.use-case'
import { DeleteUndesiredEventUseCase } from './use_cases/delete-undesired-event.use-case'
import { FindAllUndesiredEventUseCase } from './use_cases/find-all-undesired-event.use-case'
import { FindOneUndesiredEventUseCase } from './use_cases/find-one-undesired-event.use-case'
import { FindByCriticActivityIdUndesiredEventUseCase } from './use_cases/find-by-critic-activity-id-undesired-event.use-case'

const moduleMocker = new ModuleMocker(global)

describe('UndesiredEventService - flujo real', () => {
  let service: UndesiredEventService

  const mockEvent = UndesiredEvent.reconstitute({
    id: 1,
    criticActivityId: 4,
    title: 'Caída de altura',
    description: 'Existe riesgo de caída desde estructura'
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UndesiredEventService],
    }).useMocker((token) => {
      if (token === CreateUndesiredEventUseCase) return { execute: jest.fn().mockResolvedValue(mockEvent) }
      if (token === FindAllUndesiredEventUseCase) return { execute: jest.fn().mockResolvedValue([mockEvent]) }
      if (token === FindOneUndesiredEventUseCase) return { execute: jest.fn().mockResolvedValue(mockEvent) }
      if (token === UpdateUndesiredEventUseCase) return { execute: jest.fn().mockResolvedValue(mockEvent) }
      if (token === DeleteUndesiredEventUseCase) return { execute: jest.fn().mockResolvedValue(true) }
      if (token === FindByCriticActivityIdUndesiredEventUseCase) return { execute: jest.fn().mockResolvedValue([mockEvent]) }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<UndesiredEventService>(UndesiredEventService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create an event', async () => {
    const result = await service.create({
      criticActivityId: 4,
      title: 'Caída de altura',
      description: 'Existe riesgo de caída desde estructura'
    })
    expect(result).toEqual(mockEvent)
  })

  it('should return all events', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockEvent])
  })

  it('should return an event by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockEvent)
  })

  it('should update an event', async () => {
    const result = await service.update({
      id: 1,
      updateUndesiredEvent: { title: 'Nuevo título' }
    })
    expect(result).toEqual(mockEvent)
  })

  it('should delete an event', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })

  it('should find events by criticActivityId', async () => {
    const result = await service.findAllByCriticActivityId(4)
    expect(result).toEqual([mockEvent])
  })
})
