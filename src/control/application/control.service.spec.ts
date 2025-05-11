import { Test, TestingModule } from '@nestjs/testing'
import { ControlService } from './control.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Control } from '@control/domain/control'

// Use cases
import { CreateControlUseCase } from './use_cases/create-control.use-case'
import { UpdateControlUseCase } from './use_cases/update-control.use-case'
import { DeleteControlUseCase } from './use_cases/delete-control.use-case'
import { FindAllControlUseCase } from './use_cases/find-all-control.use-case'
import { FindOneControlUseCase } from './use_cases/find-one-control.use-case'

const moduleMocker = new ModuleMocker(global)

describe('ControlService - flujo real', () => {
  let service: ControlService

  const mockControl = Control.reconstitute({
    id: 1,
    criticActivityId: 3,
    title: 'Uso de casco',
    description: 'El trabajador debe usar casco al ingresar al área'
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlService],
    }).useMocker((token) => {
      if (token === CreateControlUseCase) return { execute: jest.fn().mockResolvedValue(mockControl) }
      if (token === FindAllControlUseCase) return { execute: jest.fn().mockResolvedValue([mockControl]) }
      if (token === FindOneControlUseCase) return { execute: jest.fn().mockResolvedValue(mockControl) }
      if (token === UpdateControlUseCase) return { execute: jest.fn().mockResolvedValue(mockControl) }
      if (token === DeleteControlUseCase) return { execute: jest.fn().mockResolvedValue(true) }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<ControlService>(ControlService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a control', async () => {
    const result = await service.create({
      criticActivityId: 3,
      title: 'Uso de casco',
      description: 'El trabajador debe usar casco al ingresar al área'
    })
    expect(result).toEqual(mockControl)
  })

  it('should return all controls', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockControl])
  })

  it('should return a control by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockControl)
  })

  it('should update a control', async () => {
    const result = await service.update({
      id: 1,
      updateControl: { description: 'Nuevo texto' }
    })
    expect(result).toEqual(mockControl)
  })

  it('should delete a control', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })
})
