import { Test } from '@nestjs/testing'
import { UndesiredEventModule } from './undesired-event.module'

describe('UndesiredEventModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UndesiredEventModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
