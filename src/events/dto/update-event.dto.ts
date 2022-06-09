import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  name: string;
}
