import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePlanDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber(
    {
      allowInfinity: false,
    },
    {
      message: 'Informe um valor válido',
    },
  )
  value: number;

  @ApiProperty()
  @IsOptional()
  description: string;
}
