import { Test, TestingModule } from '@nestjs/testing'
import { ControlResolver } from './control.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('ControlResolver', () => {
  let resolver: ControlResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlResolver],
    }).useMocker((token) => {
      if (token === 'IControlService') {
        return {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn()
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

    resolver = module.get<ControlResolver>(ControlResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
  it('should call create on the service', async () => {
    const input = {
      title: 'Test control',
      description: 'desc',
      criticActivityId: 1,
    }
    const service = (resolver as any).service
    await resolver.createControl(input)
    expect(service.create).toHaveBeenCalledWith(input)
  })

  it('should call findAll on the service', async () => {
    const service = (resolver as any).service
    await resolver.findAllControls()
    expect(service.findAll).toHaveBeenCalled()
  })

  it('should call findOne on the service', async () => {
    const service = (resolver as any).service
    await resolver.findControl(42)
    expect(service.findOne).toHaveBeenCalledWith(42)
  })

  it('should call update on the service', async () => {
    const input = { id: 1, title: 'Updated title', description: 'Updated desc' }
    const service = (resolver as any).service
    await resolver.updateControl(input)
    expect(service.update).toHaveBeenCalledWith({ id: input.id, updateControl: input })
  })

  it('should call delete on the service', async () => {
    const service = (resolver as any).service
    await resolver.deleteControl(99)
    expect(service.delete).toHaveBeenCalledWith(99)
  })

})
