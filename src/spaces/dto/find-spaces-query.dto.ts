import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindSpacesQueryDto extends BaseQueryParametersDto {
  @ApiPropertyOptional()
  name: string;
}
