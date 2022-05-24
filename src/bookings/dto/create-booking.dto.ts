import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Espaço',
  })
  space: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Plano',
  })
  plan: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Quantidade',
  })
  @IsNumber(
    {
      allowInfinity: false,
    },
    {
      message: 'Informe um valor válido',
    },
  )
  quantity: number;
}
