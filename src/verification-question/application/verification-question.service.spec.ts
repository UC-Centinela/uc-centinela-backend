import { Test, TestingModule } from '@nestjs/testing'
import { VerificationQuestionService } from './verification-question.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { VerificationQuestion } from '@verification-question/domain/verification-question'

import { CreateVerificationQuestionUseCase } from './use_cases/create-verification-question.use-case'
import { UpdateVerificationQuestionUseCase } from './use_cases/update-verification-question.use-case'
import { DeleteVerificationQuestionUseCase } from './use_cases/delete-verification-question.use-case'
import { FindAllVerificationQuestionUseCase } from './use_cases/find-all-verification-question.use-case'
import { FindOneVerificationQuestionUseCase } from './use_cases/find-one-verification-question.use-case'
import { FindByCriticActivityIdVerificationQuestionUseCase } from './use_cases/find-by-critic-activity-id-verification-question.use-case'

const moduleMocker = new ModuleMocker(global)

describe('VerificationQuestionService - flujo real', () => {
  let service: VerificationQuestionService

  const mockItem = VerificationQuestion.reconstitute({
    id: 1,
    criticActivityId: 5,
    title: '¿Usa guantes?',
    description: 'Debe portar guantes al operar maquinaria'
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationQuestionService],
    }).useMocker((token) => {
      if (token === CreateVerificationQuestionUseCase) return { execute: jest.fn().mockResolvedValue(mockItem) }
      if (token === FindAllVerificationQuestionUseCase) return { execute: jest.fn().mockResolvedValue([mockItem]) }
      if (token === FindOneVerificationQuestionUseCase) return { execute: jest.fn().mockResolvedValue(mockItem) }
      if (token === UpdateVerificationQuestionUseCase) return { execute: jest.fn().mockResolvedValue(mockItem) }
      if (token === DeleteVerificationQuestionUseCase) return { execute: jest.fn().mockResolvedValue(true) }
      if (token === FindByCriticActivityIdVerificationQuestionUseCase) return { execute: jest.fn().mockResolvedValue([mockItem]) }

      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>
        const Mock = moduleMocker.generateFromMetadata(mockMetadata)
        return new Mock()
      }
    }).compile()

    service = module.get<VerificationQuestionService>(VerificationQuestionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a verification question', async () => {
    const result = await service.create({
      criticActivityId: 5,
      title: '¿Usa guantes?',
      description: 'Debe portar guantes al operar maquinaria'
    })
    expect(result).toEqual(mockItem)
  })

  it('should return all verification questions', async () => {
    const result = await service.findAll()
    expect(result).toEqual([mockItem])
  })

  it('should return one verification question by ID', async () => {
    const result = await service.findOne(1)
    expect(result).toEqual(mockItem)
  })

  it('should update a verification question', async () => {
    const result = await service.update({
      id: 1,
      updateVerificationQuestion: { title: '¿Usa casco?' }
    })
    expect(result).toEqual(mockItem)
  })

  it('should delete a verification question', async () => {
    const result = await service.delete(1)
    expect(result).toBe(true)
  })

  it('should find verification questions by criticActivityId', async () => {
    const result = await service.findAllByCriticActivityId(5)
    expect(result).toEqual([mockItem])
  })
})
