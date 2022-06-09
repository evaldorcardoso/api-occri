import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nome do evento',
  })
  name: string;
}
