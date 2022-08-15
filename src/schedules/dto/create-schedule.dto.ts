import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a data de início do agendamento',
  })
  start_time: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a data de término do agendamento',
  })
  end_time: Date;
}
