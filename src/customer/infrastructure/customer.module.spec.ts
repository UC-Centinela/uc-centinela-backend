import { Test } from '@nestjs/testing'
import { CustomerModule } from './customer.module'

describe('CustomerModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CustomerModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
