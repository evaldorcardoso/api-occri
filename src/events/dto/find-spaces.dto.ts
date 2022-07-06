import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindEventsQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  name: string;
}
