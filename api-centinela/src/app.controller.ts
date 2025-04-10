import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener mensaje de bienvenida',
    description: 'Obtiene un mensaje de bienvenida',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje de bienvenida',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
