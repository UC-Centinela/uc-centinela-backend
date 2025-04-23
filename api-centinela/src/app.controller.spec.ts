import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnauthorizedException, ExecutionContext, INestApplication } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as request from 'supertest';

// Create a mock JWT guard that always throws an unauthorized exception
class MockJwtAuthGuard {
  canActivate() {
    throw new UnauthorizedException('Unauthorized access');
  }
}

describe('AppController', () => {
  let app: INestApplication;

  describe('JWT Protection', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      })
        .overrideGuard(AuthGuard('jwt'))
        .useClass(MockJwtAuthGuard)
        .compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    afterEach(async () => {
      await app.close();
    });

    it('should return 401 Unauthorized when accessing without JWT token', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized access',
          error: 'Unauthorized'
        });
    });
  });
});
