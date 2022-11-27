import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { SpacesRepository } from './spaces.repository';
import { ImagesRepository } from '../images/images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SpacesRepository, ImagesRepository])],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule { }
