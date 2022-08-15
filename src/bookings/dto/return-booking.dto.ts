import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../booking.entity';

export class ReturnBookingDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  space?: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  plan: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;

  constructor(booking: Booking) {
    this.uuid = booking.uuid;
    booking.space ? (this.space = booking.space.uuid) : null;
    booking.user ? (this.user = booking.user.uuid) : null;
    booking.plan ? (this.plan = booking.plan.uuid) : null;
    this.quantity = booking.quantity;
    this.cpf = booking.cpf;
    this.name = booking.name;
    this.status = booking.status;
    this.created_at = booking.created_at;
  }
}
