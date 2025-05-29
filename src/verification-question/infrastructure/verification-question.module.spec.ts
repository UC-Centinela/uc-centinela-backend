import { Test } from '@nestjs/testing'
import { VerificationQuestionModule } from './verification-question.module'

describe('VerificationQuestionModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VerificationQuestionModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
