import { WinstonLogger } from './index'

// Usa la implementación real de Logger de NestJS para evitar errores de decorador
const { Logger } = jest.requireActual('@nestjs/common')

describe('WinstonLogger', () => {
  let logger: WinstonLogger

  beforeEach(() => {
    logger = new WinstonLogger()
    jest.spyOn((logger as any).logger, 'log')
    jest.spyOn((logger as any).logger, 'warn')
    jest.spyOn((logger as any).logger, 'error')
    jest.spyOn((logger as any).logger, 'debug')
  })

  it('inicializa correctamente', () => {
    expect(logger).toBeDefined()
  })

  it('establece contexto de trazabilidad', () => {
    logger.setTraceContext('MyContext')
    expect((logger as any).traceContext).toBe('MyContext')
  })

  it('llama correctamente a todos los métodos del logger', () => {
    logger.setTraceContext('CTX')
    logger.info('info')
    logger.warn('warn')
    logger.error('error')
    logger.debug('debug')

    const internal = (logger as any).logger
    expect(internal.log).toHaveBeenCalledWith('info', 'CTX')
    expect(internal.warn).toHaveBeenCalledWith('warn', 'CTX')
    expect(internal.error).toHaveBeenCalledWith('error', 'CTX')
    expect(internal.debug).toHaveBeenCalledWith('debug', 'CTX')
  })
})
