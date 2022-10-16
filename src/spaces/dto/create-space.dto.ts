import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

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

  @ApiProperty({ required: false })
  @IsOptional()
  image_url: string

  @ApiProperty({ required: false })
  @IsOptional()
  image_alt: string

  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  @MinLength(1, {
    message: 'O número máximo de ocupantes deve ser no mínimo 1',
  })
  occupation_max: number
}
