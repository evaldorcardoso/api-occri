import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesRepository } from '../spaces/spaces.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansRepository } from './plans.repository';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlansRepository)
    private plansRepository: PlansRepository,
    @InjectRepository(SpacesRepository)
    private spacesRepository: SpacesRepository,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<ReturnPlanDto> {
    const plan = this.plansRepository.create(createPlanDto);
    await this.plansRepository.save(plan);
    return new ReturnPlanDto(plan);
  }

  async findAll(space_uuid: string): Promise<ReturnPlanDto[]> {
    const space = await this.spacesRepository.findOne({ uuid: space_uuid });
    if (!space) {
      throw new Error('Espaço não encontrado');
    }

    return await this.plansRepository.findPlans(space.id);
  }

  async findOne(uuid: string): Promise<ReturnPlanDto> {
    const plan = await this.plansRepository.findOne({ uuid });
    if (!plan) {
      throw new Error('Plano não encontrado');
    }
    return new ReturnPlanDto(plan);
  }

  async update(
    uuid: string,
    updatePlanDto: UpdatePlanDto,
  ): Promise<ReturnPlanDto> {
    const result = await this.plansRepository.update({ uuid }, updatePlanDto);
    if (result.affected === 0) {
      throw new Error('Plano não encontrado');
    }
    const plan = await this.plansRepository.findOne({ uuid });
    return new ReturnPlanDto(plan);
  }

  async remove(uuid: string) {
    const result = await this.plansRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new Error('Plano não encontrado');
    }
  }
}
