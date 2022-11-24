import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsRepository } from './bookings.repository';
import { ScheduleRepository } from 'src/schedules/schedule.repository';
import { SchedulesService } from 'src/schedules/schedules.service';
import { SpacesRepository } from 'src/spaces/spaces.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookingsRepository, ScheduleRepository, SpacesRepository])],
  controllers: [BookingsController],
  providers: [BookingsService, SchedulesService],
})
export class BookingsModule { }
