import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';
import { UserRole } from '../user-roles.enum';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  role: UserRole;

  is_active = true;
}
