import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../event.entity';

export class ReturnEventDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_alt: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  contact_url: string;

  @ApiProperty()
  booking: string;

  constructor(event: Event) {
    this.uuid = event.uuid ? event.uuid : null;
    this.name = event.name ? event.name : null;
    this.description = event.description ? event.description : null;
    this.image_alt = event.image_alt ? event.image_alt : null;
    this.image_url = event.image_url ? event.image_url : null;
    this.contact_url = event.contact_url ? event.contact_url : null;
    this.booking = event.booking ? event.booking.uuid : null;
  }
}
