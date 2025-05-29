import { Test } from '@nestjs/testing'
import { AppModule } from './app.module'
import { IBMStorageAdapter } from './multimedia/infrastructure/adapters/ibm-storage.adapter'
import { config } from '@commons/infrastructure/config'

// Mock the config object
jest.mock('@commons/infrastructure/config', () => ({
  config: {
    ibm: {
      endpoint: 'https://mock.endpoint',
      apiKey: 'mock-api-key',
      serviceInstanceId: 'mock-instance-id',
      ibmAuthEndpoint: 'https://mock.auth.endpoint',
      region: 'mock-region',
      bucketName: 'mock-bucket'
    },
    auth: {
      issuerUrl: 'https://mock.auth0.com',
      audience: 'mock-audience',
      domain: 'mock.auth0.com',
      clientId: 'mock-client-id',
      clientSecret: 'mock-client-secret'
    }
  }
}))

describe('AppModule', () => {
  it('should compile without errors', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    expect(moduleRef).toBeDefined()
  })
})
