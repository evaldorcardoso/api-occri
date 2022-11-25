import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesRepository } from '../spaces/spaces.repository';
import { SchedulesService } from '../schedules/schedules.service';
import { SCHEDULE_STATUS } from '../schedules/ScheduleStatus';
import { User } from '../users/user.entity';
import { BookingsRepository } from './bookings.repository';
import { BOOKING_STATUS } from './BookingStatus';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindBookingsQueryDto } from './dto/find-bookings-query.dto';
import { ReturnBookingDto } from './dto/return-booking.dto';
import { ReturnFindBookingsDto } from './dto/return-find-bookings.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ScheduleRepository } from '../schedules/schedule.repository';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
    @Inject(SchedulesService)
    private schedulesService: SchedulesService,
    @InjectRepository(SpacesRepository)
    private spacesRepository: SpacesRepository,
    @InjectRepository(ScheduleRepository)
    private schedulesRepository: ScheduleRepository
  ) { }

  async create(
    user: User,
    createBookingDto: CreateBookingDto
  ): Promise<ReturnBookingDto> {
    if (!this.isValidCPF(createBookingDto.cpf)) {
      throw new BadRequestException('CPF inválido');
    }

    if (!(this.verifyAvailability(createBookingDto.space, createBookingDto.start_time, createBookingDto.end_time))) {
      throw new BadRequestException('Este espaço não tem mais vagas disponíveis')
    }

    const booking = await this.bookingsRepository.createBooking(
      user,
      createBookingDto
    );

    await this.schedulesService.create(booking.uuid, user, {
      start_time: createBookingDto.start_time,
      end_time: createBookingDto.end_time,
    });

    return new ReturnBookingDto(booking);
  }

  async update(
    uuid: string,
    updateBookingDto: UpdateBookingDto
  ): Promise<ReturnBookingDto> {
    const result = await this.bookingsRepository.update(
      { uuid },
      updateBookingDto
    );

    if (result.affected === 0) {
      throw new Error('Reserva não encontrada');
    }

    const booking = await this.bookingsRepository.findOne(
      { uuid },
      { relations: ['schedule'] }
    );

    if (
      booking.status === BOOKING_STATUS.COMPLETED &&
      booking.schedules[0].status != SCHEDULE_STATUS.COMPLETED
    ) {
      await this.schedulesService.update(booking.schedules[0].uuid, {
        status: SCHEDULE_STATUS.COMPLETED,
      });
    }

    return new ReturnBookingDto(booking);
  }

  async findAll(
    queryDto: FindBookingsQueryDto
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
      { relations: ['user', 'space', 'plan'] }
    );
    if (!booking) {
      throw new NotFoundException('Reserva não encontrada');
    }
    return new ReturnBookingDto(booking);
  }

  async verifyAvailability(spaceUUID: string, startTime: Date, endTime: Date): Promise<boolean> {
    const space = await this.spacesRepository.findOne({ uuid: spaceUUID });
    if (!space) {
      throw new BadRequestException('Espaço não encontrado');
    }

    if (startTime >= endTime) {
      throw new BadRequestException('Intervalo inválido');
    }

    const schedules = await this.schedulesRepository.findAvailableSchedules(startTime, endTime, space.id);

    return schedules.total < space.occupation_max;
  }

  async remove(uuid: string) {
    const result = await this.bookingsRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException('Reserva não encontrada');
    }
  }

  private isValidCPF(cpf) {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    cpf = cpf.split('').map((el) => +el);
    const rest = (count) =>
      ((cpf
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;
    return rest(10) === cpf[9] && rest(11) === cpf[10];
  }
}
