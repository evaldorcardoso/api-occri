import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesRepository } from './spaces.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpacesRepository])],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
