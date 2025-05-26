import { Test, TestingModule } from '@nestjs/testing'
import { CriticActivityResolver } from './critic-activity.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { CriticActivity } from '../entities/critic-activity.entity'

const moduleMocker = new ModuleMocker(global)

describe('CriticActivityResolver', () => {
  let resolver: CriticActivityResolver
  let service: any
  let logger: any

  const mockEntity: CriticActivity = {
    id: 1,
    title: 'Actividad crítica',
    taskId: 10
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriticActivityResolver],
    }).useMocker((token) => {
      if (token === 'ICriticActivityService') {
        service = {
          create: jest.fn().mockResolvedValue(mockEntity),
          update: jest.fn().mockResolvedValue(mockEntity),
          delete: jest.fn().mockResolvedValue(true),
          findAll: jest.fn().mockResolvedValue([mockEntity]),
          findOne: jest.fn().mockResolvedValue(mockEntity),
          findAllByTaskId: jest.fn().mockResolvedValue([mockEntity])
        }
        return service
      }

      if (token === 'LOGGER') {
        logger = {
          debug: jest.fn(),
          setTraceContext: jest.fn()
        }
        return logger
      }

      if (typeof token === 'function') {
        const metadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(metadata)
        return new Mock()
      }
    }).compile()

    resolver = module.get(CriticActivityResolver)
  })

  it('se instancia correctamente', () => {
    expect(resolver).toBeDefined()
    expect(logger.setTraceContext).toHaveBeenCalledWith('CriticActivityResolver')
  })

  it('crea una actividad crítica', async () => {
    const input = { title: 'Nueva', taskId: 2 }
    const result = await resolver.create(input as any)
    expect(result).toEqual(mockEntity)
    expect(service.create).toHaveBeenCalledWith(input)
  })

  it('lanza error si create falla', async () => {
    service.create.mockRejectedValueOnce(new Error('Falla creación'))
    await expect(resolver.create({ title: 'x', taskId: 1 } as any)).rejects.toThrow('Falla creación')
  })

  it('actualiza una actividad crítica', async () => {
    const input = { id: 1, title: 'Actualizado', taskId: 2 }
    const result = await resolver.update(input as any)
    expect(result).toEqual(mockEntity)
    expect(service.update).toHaveBeenCalledWith({ id: 1, updateCriticActivity: input })
  })

  it('lanza error si update falla', async () => {
    service.update.mockRejectedValueOnce(new Error('Falla update'))
    await expect(resolver.update({ id: 1, title: 'x', taskId: 2 } as any)).rejects.toThrow('Falla update')
  })

  it('elimina una actividad crítica', async () => {
    const result = await resolver.delete(1)
    expect(result).toBe(true)
    expect(service.delete).toHaveBeenCalledWith(1)
  })

  it('lanza error si delete falla', async () => {
    service.delete.mockRejectedValueOnce(new Error('Falla delete'))
    await expect(resolver.delete(1)).rejects.toThrow('Falla delete')
  })

  it('retorna todas las actividades críticas', async () => {
    const result = await resolver.findAll()
    expect(result).toEqual([mockEntity])
    expect(service.findAll).toHaveBeenCalled()
  })

  it('lanza error si findAll falla', async () => {
    service.findAll.mockRejectedValueOnce(new Error('Falla findAll'))
    await expect(resolver.findAll()).rejects.toThrow('Falla findAll')
  })

  it('retorna una actividad por ID', async () => {
    const result = await resolver.findOne(1)
    expect(result).toEqual(mockEntity)
    expect(service.findOne).toHaveBeenCalledWith(1)
  })

  it('lanza error si findOne falla', async () => {
    service.findOne.mockRejectedValueOnce(new Error('Falla findOne'))
    await expect(resolver.findOne(1)).rejects.toThrow('Falla findOne')
  })

  it('retorna todas las actividades por taskId', async () => {
    const result = await resolver.findAllByTaskId(10)
    expect(result).toEqual([mockEntity])
    expect(service.findAllByTaskId).toHaveBeenCalledWith(10)
  })

  it('lanza error si findAllByTaskId falla', async () => {
    service.findAllByTaskId.mockRejectedValueOnce(new Error('Falla findAllByTaskId'))
    await expect(resolver.findAllByTaskId(10)).rejects.toThrow('Falla findAllByTaskId')
  })
})
