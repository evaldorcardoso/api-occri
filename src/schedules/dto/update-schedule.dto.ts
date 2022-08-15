import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto {
  @ApiProperty()
  @IsOptional()
  start_time?: Date;

  @ApiProperty()
  @IsOptional()
  end_time?: Date;

  @ApiProperty()
  @IsOptional()
  status?: string;
}
