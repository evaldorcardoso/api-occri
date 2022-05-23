import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do plano',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o valor do plano',
  })
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
