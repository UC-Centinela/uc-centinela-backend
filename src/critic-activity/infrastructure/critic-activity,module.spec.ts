import { Test } from '@nestjs/testing'
import { CriticActivityModule } from './critic-activity.module'

describe('CriticActivityModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CriticActivityModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
