import { Plan } from '../plan.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ReturnPlanDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  value?: number;

  @ApiProperty()
  @IsOptional()
  space?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  constructor(plan: Plan) {
    this.uuid = plan.uuid ? plan.uuid : null;
    this.type = plan.type ? plan.type : null;
    this.value = plan.value;
    if (plan.space) this.space = plan.space.uuid;
    if (plan.description) this.description = plan.description;
  }
}
