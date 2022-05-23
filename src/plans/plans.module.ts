import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesRepository } from 'src/spaces/spaces.repository';
import { PlansRepository } from './plans.repository';
import { PlansService } from './plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlansRepository, SpacesRepository])],
  providers: [PlansService],
})
export class PlansModule {}
