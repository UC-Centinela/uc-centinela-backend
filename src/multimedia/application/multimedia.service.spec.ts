import { Test, TestingModule } from '@nestjs/testing'
import { MultimediaService } from './multimedia.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { Multimedia } from '@multimedia/domain/multimedia'

// Importa los use-cases
import { CreateMultimediaUseCase } from './use_cases/create-multimedia.use-case'
import { UpdateMultimediaUseCase } from './use_cases/update-multimedia.use-case'
import { DeleteMultimediaUseCase } from './use_cases/delete-multimedia.use-case'
import { FindAllMultimediaUseCase } from './use_cases/find-all-multimedia.use-case'
import { FindOneMultimediaUseCase } from './use_cases/find-one-multimedia.use-case'

const moduleMocker = new ModuleMocker(global)

describe('MultimediaService - flujo real', () => {
  let service: MultimediaService

  const mockMultimedia = Multimedia.reconstitute({
    id: 1,
    taskId: 1,
    photoUrl: 'https://cos/image.jpg',
    videoUrl: 'https://cos/video.mp4',
    audioTranscription: 'Texto transcrito',
    createdAt: new Date(),
    updatedAt: new Date()
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaService],
    }).useMocker((token) => {
      if (token === CreateMultimediaUseCase) {
        return { execute: jest.fn().mockResolvedValue(mockMultimedia) }
      }
      if (token === FindAllMultimediaUseCase) {
        return { execute: jest.fn().mockResolvedValue([mockMultimedia]) }
      }
      if (token === FindOneMultimediaUseCase) {
        return { execute: jest.fn().mockResolvedValue(mockMultimedia) }
      }
      if (token === UpdateMultimediaUseCase) {
        return { execute: jest.fn().mockResolvedValue(mockMultimedia) }
      }
      if (token === DeleteMultimediaUseCase) {
        return { execute: jest.fn().mockResolvedValue(true) }
      }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<MultimediaService>(MultimediaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a multimedia entry', async () => {
    const result = await service.create({
      taskId: 1,
      photoUrl: 'https://cos/image.jpg',
      videoUrl: 'https://cos/video.mp4',
      audioTranscription: 'Texto transcrito'
    })
    expect(result).toEqual(mockMultimedia)
  })

  it('should return all multimedia entries', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockMultimedia])
  })

  it('should return one multimedia entry by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockMultimedia)
  })

  it('should update a multimedia entry', async () => {
    const result = await service.update({
      id: 1,
      updateMultimedia: { videoUrl: 'new-url.mp4' }
    })
    expect(result).toEqual(mockMultimedia)
  })

  it('should delete a multimedia entry', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })
})
