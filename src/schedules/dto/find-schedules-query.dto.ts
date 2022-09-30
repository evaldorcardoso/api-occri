import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';

export class FindSchedulesQueryDto extends BaseQueryParametersDto {
  @ApiPropertyOptional()
  start_time: Date;

  @ApiPropertyOptional()
  end_time: Date;
}
