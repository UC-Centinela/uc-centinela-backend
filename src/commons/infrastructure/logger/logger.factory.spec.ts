import { LoggerFactory } from './logger.factory'
import * as winston from 'winston'
import { Config } from '@commons/domain/config.entity'

describe('LoggerFactory', () => {
  const baseConfig: Config = {
    hostnameBackend: '',
    hostnameFrontend: [],
    portServer: '',
    nodeEnv: 'local',
    debug: true,
    gcpProjectId: '',
    auth: {
      issuerUrl: '',
      audience: '',
      clientId: '',
      clientSecret: '',
      managementClientId: '',
      managementClientSecret: ''
    },
    roleIds: {
      roleSuperAdmin: '',
      roleAdmin: '',
      roleOperator: '',
      roleGuest: ''
    },
    ibm: {
      endpoint: '',
      apiKey: '',
      serviceInstanceId: '',
      bucketName: '',
      ibmAuthEndpoint: '',
      region: ''
    },
    openai: {
      apiKey: ''
    }
  }

  it('crea logger para entorno local con archivo de log', () => {
    const logger = LoggerFactory({ ...baseConfig, nodeEnv: 'local' })
    expect(logger).toBeDefined()
  })

  it('crea logger para entorno productivo sin archivo de log', () => {
    const logger = LoggerFactory({ ...baseConfig, nodeEnv: 'prod' })
    expect(logger).toBeDefined()
  })
})
