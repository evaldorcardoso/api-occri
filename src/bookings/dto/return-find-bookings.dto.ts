import { ApiProperty } from '@nestjs/swagger';
import { ReturnBookingDto } from './return-booking.dto';

export class ReturnFindBookingsDto {
  @ApiProperty({ type: ReturnBookingDto, isArray: true })
  bookings: ReturnBookingDto[];

  @ApiProperty({ default: 1 })
  total: number;
}
