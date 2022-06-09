import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../event.entity';

export class ReturnEventDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  booking: string;

  constructor(event: Event) {
    this.uuid = event.uuid ? event.uuid : null;
    this.name = event.name ? event.name : null;
    this.booking = event.booking ? event.booking.uuid : null;
  }
}
