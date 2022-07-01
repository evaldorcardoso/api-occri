import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';

export class FindSchedulesQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: Date;
}
