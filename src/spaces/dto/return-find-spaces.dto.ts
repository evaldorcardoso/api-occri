import { ApiProperty } from '@nestjs/swagger';
import { ReturnSpaceDto } from './return-space.dto';

export class ReturnFindSpacesDto {
  @ApiProperty({ type: ReturnSpaceDto, isArray: true })
  spaces: ReturnSpaceDto[];

  @ApiProperty({ default: 1 })
  total: number;
}
