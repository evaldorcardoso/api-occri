import { Space } from '../space.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnSpaceDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  image_alt: string;

  @ApiProperty()
  occupation_max: number;

  constructor(space: Space) {
    this.uuid = space.uuid ? space.uuid : null;
    this.name = space.name ? space.name : null;
    this.description = space.description ? space.description : null;
    this.image_url = space.image_url ? space.image_url : null;
    this.image_alt = space.image_alt ? space.image_alt : null;
    this.occupation_max = space.occupation_max ? space.occupation_max : null;
  }
}
