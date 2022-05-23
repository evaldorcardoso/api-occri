import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(200, {
    message: 'O nome não pode ter mais de 200 caracteres',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;
}
