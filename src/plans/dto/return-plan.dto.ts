import { Plan } from '../plan.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnPlanDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  space: string;

  @ApiProperty()
  description: string;

  constructor(plan: Plan) {
    this.uuid = plan.uuid ? plan.uuid : null;
    this.name = plan.name ? plan.name : null;
    this.value = plan.value ? plan.value : null;
    this.space = plan.space ? plan.space.uuid : null;
    this.description = plan.description ? plan.description : null;
  }
}
