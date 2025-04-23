import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { User } from './user.entity';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Crear un usuario',
    description: 'Crea un usuario si los datos son válidos',
  })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
  @Serialize(UserDto)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Obtiene todos los usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: UserDto,
    isArray: true,
  })
  @Serialize(UserDto)
  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userService.findUsers();
    return users;
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Obtener usuario por id',
    description: 'Obtiene un usuario a partir de su id',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserDto,
  })
  @ApiParam({ name: 'id', description: 'Id del usuario a buscar' })
  @Serialize(UserDto)
  async getUserById(@Param('id') id: string): Promise<User> {
    const user: User = await this.userService.findOneUser(id);
    return user;
  }
  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Actualizar usuario por id',
    description:
      'Actualiza un usuario a partir de su id. Es necesario enviar todos los campos',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado',
    type: UserDto,
  })
  @ApiParam({ name: 'id', description: 'Id del usuario a actualizar' })
  @Serialize(UserDto)
  async updateUserById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, body);
  }
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Eliminar usuario por id',
    description: 'Elimina un usuario a partir de su id',
  })
  @ApiResponse({ status: 200, description: 'Usuario eliminado', type: UserDto })
  @ApiParam({ name: 'id', description: 'Id del usuario a eliminar' })
  @Serialize(UserDto)
  async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.removeUser(id);
  }
}
