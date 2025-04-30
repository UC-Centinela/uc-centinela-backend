import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import { Config } from '@commons/domain/config.entity'
import * as winston from 'winston'

export const LoggerFactory = (config: Config) => {
  let consoleFormat

  if (config.nodeEnv === 'local' || config.nodeEnv === 'local-auth') {
    consoleFormat = winston.format.combine(
      winston.format.ms(),
      winston.format.timestamp(),
      winston.format.json(),
      nestWinstonModuleUtilities.format.nestLike()
    )
  } else {
    consoleFormat = winston.format.combine(
      winston.format.ms(),
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    )
  }

  const consoleTransport = new winston.transports.Console({
    format: consoleFormat,
    level: config.nodeEnv != 'local' && config.nodeEnv != 'local-auth' ? 'info' : 'debug',
  })

  const transports: winston.transport[] = [consoleTransport]

  if (config.nodeEnv === 'local' || config.nodeEnv === 'local-auth') {
    const fileTransport = new winston.transports.File({
      filename: 'logs/app.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
      ),
      level: 'debug',
    })
    transports.push(fileTransport)
  }

  return WinstonModule.createLogger({
    transports,
  })
}