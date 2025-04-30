import { ILogger } from '@commons/domain/interfaces/logger.interface'
import { Logger, Injectable } from '@nestjs/common'

@Injectable()
export class WinstonLogger implements ILogger {

  private logger: Logger

  private traceContext: string = 'Default'

  constructor () {
    this.logger = new Logger(WinstonLogger.name)
    this.logger.log('Logger initialized')
  }

  setTraceContext (context: string): void {
    this.traceContext = context
  }

  info (message: string): void {
    this.logger.log(message, this.traceContext)
  }

  warn (message: string): void {
    this.logger.warn(message, this.traceContext)
  }

  error (message: string): void {
    this.logger.error(message, this.traceContext)
  }

  debug (message: string): void {
    this.logger.debug(message, this.traceContext)
  }
}