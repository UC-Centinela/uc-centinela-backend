jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      useGlobalPipes: jest.fn(),
      useLogger: jest.fn(),
      register: jest.fn(),
      listen: jest.fn()
    })
  }
}))
jest.mock('@commons/infrastructure/logger/logger.factory', () => ({
  LoggerFactory: () => ({})
}))
jest.mock('@commons/infrastructure/config', () => ({
  config: {
    portServer: 3000,
    hostnameBackend: 'localhost',
    hostnameFrontend: ['localhost'],
    nodeEnv: 'test'
  }
}))

describe('Bootstrap', () => {
  it('should run main without crashing', async () => {
    await import('./main')
    expect(true).toBe(true)
  })
})
