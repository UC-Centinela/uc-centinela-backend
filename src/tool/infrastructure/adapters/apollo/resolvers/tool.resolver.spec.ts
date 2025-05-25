import { Test, TestingModule } from '@nestjs/testing'
import { ToolResolver } from './tool.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('ToolResolver', () => {
  let resolver: ToolResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolResolver],
    }).useMocker((token) => {
      if (token === 'IToolService') {
        return {
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          findAllByCriticActivityId: jest.fn()
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

    resolver = module.get<ToolResolver>(ToolResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should call createTool on the service', async () => {
    const input = {
      title: 'Tool A',
      description: 'Description A',
      criticActivityId: 42
    }
    const service = (resolver as any).service
    await resolver.createTool(input)
    expect(service.create).toHaveBeenCalledWith(input)
  })

  it('should call findAllTools on the service', async () => {
    const service = (resolver as any).service
    await resolver.findAllTools()
    expect(service.findAll).toHaveBeenCalled()
  })

  it('should call findTool on the service', async () => {
    const service = (resolver as any).service
    await resolver.findTool(12)
    expect(service.findOne).toHaveBeenCalledWith(12)
  })

  it('should call findToolsByCriticActivity on the service', async () => {
    const service = (resolver as any).service
    await resolver.findToolsByCriticActivity(7)
    expect(service.findAllByCriticActivityId).toHaveBeenCalledWith(7)
  })

  it('should call updateTool on the service', async () => {
    const input = {
      id: 10,
      title: 'Updated Tool',
      description: 'Updated Desc',
      criticActivityId: 5
    }
    const service = (resolver as any).service
    await resolver.updateTool(input)
    expect(service.update).toHaveBeenCalledWith({ id: input.id, updateTool: input })
  })

  it('should call deleteTool on the service', async () => {
    const service = (resolver as any).service
    await resolver.deleteTool(123)
    expect(service.delete).toHaveBeenCalledWith(123)
  })

})
