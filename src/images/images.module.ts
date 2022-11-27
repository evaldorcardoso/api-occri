import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
