import { ApiProperty } from '@nestjs/swagger';
import { ReturnEventDto } from './return-event.dto';

export class ReturnFindEventsDto {
  @ApiProperty({ type: ReturnEventDto, isArray: true })
  events: ReturnEventDto[];

  @ApiProperty({ default: 1 })
  total: number;
}
