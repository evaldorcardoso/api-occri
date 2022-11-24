import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o tipo do plano',
  })
  type: string;

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
    }
  )
  value: number;

  @ApiProperty()
  @IsOptional()
  description: string;
}
