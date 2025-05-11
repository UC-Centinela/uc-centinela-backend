import { Test, TestingModule } from '@nestjs/testing'
import { ToolService } from './tool.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Tool } from '../domain/tool'

// Use cases
import { CreateToolUseCase } from './use_cases/create-tool.use-case'
import { FindAllToolUseCase } from './use_cases/find-all-tool.use-case'
import { FindOneToolUseCase } from './use_cases/find-one-tool.use-case'
import { UpdateToolUseCase } from './use_cases/update-tool.use-case'
import { DeleteToolUseCase } from './use_cases/delete-tool.use-case'
import { FindByCriticActivityIdToolUseCase } from './use_cases/find-by-critic-activity-id-tool.use-case'

const moduleMocker = new ModuleMocker(global)

describe('ToolService - flujo real', () => {
  let service: ToolService

  const mockTool = Tool.reconstitute({
    id: 1,
    criticActivityId: 4,
    title: 'Martillo'
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolService],
    }).useMocker((token) => {
      if (token === CreateToolUseCase) return { execute: jest.fn().mockResolvedValue(mockTool) }
      if (token === FindAllToolUseCase) return { execute: jest.fn().mockResolvedValue([mockTool]) }
      if (token === FindOneToolUseCase) return { execute: jest.fn().mockResolvedValue(mockTool) }
      if (token === UpdateToolUseCase) return { execute: jest.fn().mockResolvedValue(mockTool) }
      if (token === DeleteToolUseCase) return { execute: jest.fn().mockResolvedValue(true) }
      if (token === FindByCriticActivityIdToolUseCase) return { execute: jest.fn().mockResolvedValue([mockTool]) }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<ToolService>(ToolService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a tool', async () => {
    const result = await service.create({
      criticActivityId: 4,
      title: 'Martillo'
    })
    expect(result).toEqual(mockTool)
  })

  it('should return all tools', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockTool])
  })

  it('should return a tool by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockTool)
  })

  it('should update a tool', async () => {
    const result = await service.update({
      id: 1,
      updateTool: { title: 'Nuevo martillo' }
    })
    expect(result).toEqual(mockTool)
  })

  it('should delete a tool', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })

  it('should find tools by criticActivityId', async () => {
    const result = await service.findAllByCriticActivityId(4)
    expect(result).toEqual([mockTool])
  })
})
