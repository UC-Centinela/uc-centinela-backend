import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from '@commons/infrastructure/config'
import { LoggerFactory } from '@commons/infrastructure/logger/logger.factory'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastifyCors from '@fastify/cors'

async function bootstrap () {

  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({
        bodyLimit: 100 * 1024 * 1024, //100MB aunque aquí hay que cambiarlo si se desea menos
        https: config.nodeEnv === 'local-auth' ? 
          {
            key: readFileSync(join(__dirname, `../ssl/${config.hostnameBackend}-key.pem`)),
            cert: readFileSync(join(__dirname, `../ssl/${config.hostnameBackend}.pem`))
          } : undefined,
      })     
    )

    // Global pipes
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useLogger(LoggerFactory(config))
  
    // CORS
    await app.register(fastifyCors as any, {
      origin: (origin, callback) => {
        const allowedOrigins: string[] = config.hostnameFrontend
  
        // Permite la solicitud si el origen está en la lista de orígenes permitidos
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
        } else {
          callback(new Error(`Origin: ${origin} No permitido por CORS`))
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Cookie'],
      preflight: true,
      preflightContinue: false
    })

    // Init Nest
    await app.listen(config.portServer, config.hostnameBackend)

    Logger.log(
      `Server running on: ${config.nodeEnv==='local-auth' ? 'https://' : 'http://'}${config.hostnameBackend}:${config.portServer}`,
      'Bootstrap'
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      Logger.error(
        "No se encontraron los certificados SSL, por favor genere los certificados SSL para poder ejecutar el servidor en modo local-auth",
        error.stack, 'Bootstrap'
      )
    } else {
      Logger.error(error.stack, 'Bootstrap')
    }
  }
}
bootstrap()