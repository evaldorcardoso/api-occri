import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdateSpaceDto {
  @ApiProperty()
  @IsOptional()
  @MaxLength(200, {
    message: 'O nome não pode ter mais de 200 caracteres',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;
}
