import { Test } from '@nestjs/testing'
import { ControlStrategyModule } from './control-strategy.module'

describe('ControlStrategyModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ControlStrategyModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
