import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsRepository } from './bookings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookingsRepository])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
