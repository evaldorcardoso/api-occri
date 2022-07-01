import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a data de início do agendamento',
  })
  start_time: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a data de término do agendamento',
  })
  end_time: string;
}
