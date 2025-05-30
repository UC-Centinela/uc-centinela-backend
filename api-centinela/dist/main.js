"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const PORT = parseInt(process.env.PORT) || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 60 * 1000,
        max: 1000,
        validate: { xForwardedForHeader: false },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Centinela')
        .setDescription('API para el manejo de la información de Centinela')
        .setVersion('1.1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map