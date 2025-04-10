import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = parseInt(process.env.PORT) || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 1000,
      validate: { xForwardedForHeader: false },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API Centinela')
    .setDescription(
      'API para el manejo de la información de Centinela',
    )
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}
bootstrap();
