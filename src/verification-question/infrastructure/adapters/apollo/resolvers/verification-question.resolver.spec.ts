import { Test, TestingModule } from '@nestjs/testing'
import { VerificationQuestionResolver } from './verification-question.resolver'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('VerificationQuestionResolver', () => {
  let resolver: VerificationQuestionResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationQuestionResolver],
    }).useMocker((token) => {
      if (token === 'IVerificationQuestionService') {
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

    resolver = module.get<VerificationQuestionResolver>(VerificationQuestionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
