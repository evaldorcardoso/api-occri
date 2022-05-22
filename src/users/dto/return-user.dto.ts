import { User } from '../user.entity';
import { UserRole } from '../user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  constructor(user: User) {
    this.uuid = user.uuid ? user.uuid : null;
    this.email = user.email ? user.email : null;
    this.name = user.name ? user.name : null;
    this.role = UserRole[user.role] ? UserRole[user.role] : null;
  }
}
