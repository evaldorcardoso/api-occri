import { ApiProperty } from '@nestjs/swagger';
import { ReturnScheduleDto } from './return-schedule.dto';

export class ReturnFindSchedulesDto {
  @ApiProperty({ type: ReturnScheduleDto, isArray: true })
  schedules: ReturnScheduleDto[];

  @ApiProperty({ default: 1 })
  total: number;
}
