import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../booking.entity';

export class ReturnBookingDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  space: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  plan: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;

  constructor(booking: Booking) {
    this.uuid = booking.uuid;
    this.space = booking.space.uuid;
    this.user = booking.user.uuid;
    this.plan = booking.plan.uuid;
    this.quantity = booking.quantity;
    this.status = booking.status;
    this.created_at = booking.created_at;
  }
}
