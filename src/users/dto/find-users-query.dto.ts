import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';
import { UserRole } from '../user-roles.enum';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: UserRole;

  is_active = true;
}
