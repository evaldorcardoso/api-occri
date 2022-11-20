import { Plan } from '../plan.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnPlanDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  space: string;

  @ApiProperty()
  description?: string;

  constructor(plan: Plan) {
    this.uuid = plan.uuid ? plan.uuid : null;
    this.type = plan.type ? plan.type : null;
    this.value = plan.value ? plan.value : null;
    this.space = plan.space ? plan.space.uuid : null;
    if (plan.description) this.description = plan.description;
  }
}
