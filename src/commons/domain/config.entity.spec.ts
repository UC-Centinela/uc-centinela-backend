import { Config } from './config.entity'

describe('Config Entity', () => {
  it('permite definir y acceder a sus propiedades', () => {
    const config: Config = {
      hostnameBackend: 'http://localhost:3000',
      hostnameFrontend: ['http://localhost:4200'],
      portServer: '3000',
      nodeEnv: 'test',
      debug: true,
      gcpProjectId: 'project-id',
      auth: {
        issuerUrl: 'https://issuer.com',
        audience: 'aud',
        clientId: 'client-id',
        clientSecret: 'secret',
        managementClientId: 'mgmt-client-id',
        managementClientSecret: 'mgmt-secret'
      },
      roleIds: {
        roleSuperAdmin: '1',
        roleAdmin: '2',
        roleOperator: '3',
        roleGuest: '4'
      },
      ibm: {
        endpoint: 'https://ibm.com',
        apiKey: 'api-key',
        serviceInstanceId: 'instance-id',
        bucketName: 'bucket',
        ibmAuthEndpoint: 'https://auth.ibm.com',
        region: 'us-south'
      },
      openai: {
        apiKey: 'openai-key'
      }
    }

    expect(config.auth.clientId).toBe('client-id')
    expect(config.ibm.region).toBe('us-south')
    expect(config.openai.apiKey).toBe('openai-key')
  })
})
