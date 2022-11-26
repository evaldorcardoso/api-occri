import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

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
    message: 'Informe o CPF do Usuário',
  })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Nome do Usuário',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Data de Início',
  })
  @IsDateString({
    message: 'Informe a Data de Início',
  })
  start_time: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Data de Fim',
  })
  @IsDateString({
    message: 'Informe a Data de Fim',
  })
  end_time: Date;
}
