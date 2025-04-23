import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('app')
@ApiBearerAuth('JWT-auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
