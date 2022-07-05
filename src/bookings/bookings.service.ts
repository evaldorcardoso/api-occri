import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { BookingsRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindBookingsQueryDto } from './dto/find-bookings-query.dto';
import { ReturnBookingDto } from './dto/return-booking.dto';
import { ReturnFindBookingsDto } from './dto/return-find-bookings.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async create(
    user: User,
    createBookingDto: CreateBookingDto,
  ): Promise<ReturnBookingDto> {
    const booking = await this.bookingsRepository.createBooking(
      user,
      createBookingDto,
    );
    return new ReturnBookingDto(booking);
  }

  async update(
    uuid: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<ReturnBookingDto> {
    const result = await this.bookingsRepository.update(
      { uuid },
      updateBookingDto,
    );
    if (result.affected === 0) {
      throw new Error('Reserva não encontrada');
    }
    const booking = await this.bookingsRepository.findOne({ uuid });
    return new ReturnBookingDto(booking);
  }

  async findAll(
    queryDto: FindBookingsQueryDto,
  ): Promise<ReturnFindBookingsDto> {
    const found = await this.bookingsRepository.findBookings(queryDto);
    return {
      bookings: found.bookings.map((booking) => new ReturnBookingDto(booking)),
      total: found.total,
    };
  }

  async findOne(uuid: string): Promise<ReturnBookingDto> {
    const booking = await this.bookingsRepository.findOne(
      { uuid },
      { relations: ['user', 'space', 'plan'] },
    );
    if (!booking) {
      throw new NotFoundException('Reserva não encontrada');
    }
    return new ReturnBookingDto(booking);
  }

  async remove(uuid: string) {
    const result = await this.bookingsRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException('Reserva não encontrada');
    }
  }
}
