import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty({ message: 'Tiene que ingresar nombre' })
  name: string;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'juanperez@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Tiene que ingresar email' })
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Ingrese un email válido',
  })
  email: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '+51987654321' })
  @IsString()
  @IsNotEmpty({ message: 'Tiene que ingresar teléfono' })
  @Matches(/^\+[0-9]{11}$/, {
    message: 'Ingrese un teléfono válido',
  })
  phone: string;

  @ApiProperty({
    description: 'Descripción del usuario',
    example: 'Minero con 3 años de experiencia',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tiene que ingresar una descripción' })
  description: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  description: string;
}
