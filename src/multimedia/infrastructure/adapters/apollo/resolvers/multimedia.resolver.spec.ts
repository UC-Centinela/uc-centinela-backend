import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaResolver } from './multimedia.resolver';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('MultimediaResolver', () => {
  let resolver: MultimediaResolver;

  const mockMultimedia = {
    id: 1,
    taskId: 1,
    photoUrl: 'img.jpg',
    videoUrl: 'vid.mp4',
    audioTranscription: 'Texto',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaResolver],
    }).useMocker((token) => {
      if (token === 'IMultimediaService') {
        return {
          create: jest.fn().mockResolvedValue(mockMultimedia),
          findAll: jest.fn().mockResolvedValue([mockMultimedia]),
          findOne: jest.fn().mockResolvedValue(mockMultimedia),
          update: jest.fn().mockResolvedValue(mockMultimedia),
          delete: jest.fn().mockResolvedValue(true),
        };
      }

      if (token === 'LOGGER') {
        return {
          debug: jest.fn(),
          setTraceContext: jest.fn(),
        };
      }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    }).compile();

    resolver = module.get<MultimediaResolver>(MultimediaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a multimedia record', async () => {
    const input = {
      taskId: 1,
      photoUrl: 'img.jpg',
      toDomain: () => mockMultimedia,
    };

    const result = await resolver.createMultimedia(input as any);
    expect(result).toEqual(mockMultimedia);
  });

  it('should return all multimedia records', async () => {
    const result = await resolver.findAllMultimedia();
    expect(result).toEqual([mockMultimedia]);
  });

  it('should return multimedia by ID', async () => {
    const result = await resolver.findMultimedia(1);
    expect(result).toEqual(mockMultimedia);
  });

  it('should update multimedia', async () => {
    const result = await resolver.updateMultimedia({
      id: 1,
      photoUrl: 'otra.jpg',
    } as any);
    expect(result).toEqual(mockMultimedia);
  });

  it('should delete multimedia', async () => {
    const result = await resolver.deleteMultimedia(1);
    expect(result).toBe(true);
  });
});
