import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do evento',
  })
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
