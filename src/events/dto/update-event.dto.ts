import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image_url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image_alt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  contact_url: string;
}
