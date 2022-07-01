import { Schedule } from '../schedule.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnScheduleDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: Date;

  @ApiProperty()
  booking: string;

  constructor(schedule: Schedule) {
    this.uuid = schedule.uuid ? schedule.uuid : null;
    this.booking = schedule.booking ? schedule.booking.uuid : null;
    this.start_time = schedule.start_time ? schedule.start_time : null;
    this.end_time = schedule.end_time ? schedule.end_time : null;
  }
}
