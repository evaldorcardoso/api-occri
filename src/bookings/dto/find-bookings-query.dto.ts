import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';

export class FindBookingsQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  space: string;

  @ApiProperty()
  user: string;

  @ApiProperty()
  plan: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;
}
