import { IsIn } from "class-validator";
import { BOOKING_STATUS } from "../BookingStatus";

export class UpdateBookingDto {
  @IsIn(Object.values(BOOKING_STATUS))
  status: string;
}
