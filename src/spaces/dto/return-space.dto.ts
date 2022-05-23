import { Space } from '../space.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnSpaceDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  constructor(space: Space) {
    this.uuid = space.uuid ? space.uuid : null;
    this.name = space.name ? space.name : null;
    this.description = space.description ? space.description : null;
  }
}
