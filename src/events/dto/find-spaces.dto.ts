import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';

export class FindEventsQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  name: string;
}
