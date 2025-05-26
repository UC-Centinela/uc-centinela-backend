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
    const port = process.env.PORT || process.env.PORT_NUMBER || config.portServer || 3443;
    const host = process.env.HOST || '0.0.0.0';

    await app.listen(port, host);
    Logger.log(`Server running at http://${host}:${port}`, 'Bootstrap');
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