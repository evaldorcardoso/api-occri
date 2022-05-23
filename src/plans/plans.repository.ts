import { EntityRepository, Repository } from 'typeorm';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { Plan } from './plan.entity';

@EntityRepository(Plan)
export class PlansRepository extends Repository<Plan> {
  async findPlans(space_id: number): Promise<ReturnPlanDto[]> {
    const query = this.createQueryBuilder('plan');

    query.innerJoinAndSelect(
      'plan.space',
      'space',
      'space.id = plan.space_id AND space.id = :space_id',
      { space_id },
    );

    query.select([
      'plan.uuid',
      'plan.name',
      'plan.description',
      'plan.created_at',
      'space',
    ]);

    const plans = await query.getMany();

    return plans.map((plan) => new ReturnPlanDto(plan));
  }
}
