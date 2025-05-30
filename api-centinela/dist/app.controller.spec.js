"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const request = require("supertest");
class MockJwtAuthGuard {
    canActivate() {
        throw new common_1.UnauthorizedException('Unauthorized access');
    }
}
describe('AppController', () => {
    let app;
    describe('JWT Protection', () => {
        beforeEach(async () => {
            const moduleRef = await testing_1.Test.createTestingModule({
                controllers: [app_controller_1.AppController],
                providers: [app_service_1.AppService],
            })
                .overrideGuard((0, passport_1.AuthGuard)('jwt'))
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
//# sourceMappingURL=app.controller.spec.js.map