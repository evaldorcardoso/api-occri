import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o código identificador único',
  })
  uuid: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe um endereço de email válido',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(100, {
    message: 'O email não pode ter mais de 100 caracteres',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(100, {
    message: 'O nome não pode ter mais de 100 caracteres',
  })
  name: string;
}
