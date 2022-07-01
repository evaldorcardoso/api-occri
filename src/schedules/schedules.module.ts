import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';
import { BookingsRepository } from 'src/bookings/bookings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRepository, BookingsRepository])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}
