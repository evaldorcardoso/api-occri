import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user-roles.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um email válido',
    },
  )
  email: string;
}
