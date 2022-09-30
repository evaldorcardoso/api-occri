import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindBookingsQueryDto extends BaseQueryParametersDto {
  @ApiPropertyOptional()
  space: string;

  @ApiPropertyOptional()
  user: string;

  @ApiPropertyOptional()
  plan: string;

  @ApiPropertyOptional()
  status: string;

  @ApiPropertyOptional()
  created_at: Date;
}
