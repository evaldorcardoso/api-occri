import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesRepository } from 'src/spaces/spaces.repository';
import { PlansController } from './plans.controller';
import { PlansRepository } from './plans.repository';
import { PlansService } from './plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlansRepository, SpacesRepository])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
