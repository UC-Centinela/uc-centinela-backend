import { Test } from '@nestjs/testing'
import { AppModule } from './app.module'
import { IBMStorageAdapter } from './multimedia/infrastructure/adapters/ibm-storage.adapter'

describe('AppModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IBMStorageAdapter)
      .useValue({})
      .compile()

    expect(moduleRef).toBeDefined()
  })
})
