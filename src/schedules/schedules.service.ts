import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { BookingsRepository } from '../bookings/bookings.repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { ReturnFindSchedulesDto } from './dto/return-find-schedules.dto';
import { ReturnScheduleDto } from './dto/return-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleRepository)
    private scheduleRepository: ScheduleRepository,
    @InjectRepository(BookingsRepository)
    private bookingRepository: BookingsRepository,
  ) {}

  async create(
    booking_uuid: string,
    user: User,
    createScheduleDto: CreateScheduleDto,
  ) {
    const booking = await this.bookingRepository.findOne({
      uuid: booking_uuid,
    });
    if (!booking) {
      throw new Error('Reserva não encontrada');
    }
    const schedule = await this.scheduleRepository.createSchedule(
      user,
      booking,
      createScheduleDto,
    );

    return new ReturnScheduleDto(schedule);
  }

  async findAll(
    booking_uuid: string,
    queryDto: FindSchedulesQueryDto,
  ): Promise<ReturnFindSchedulesDto> {
    let found;
    if (booking_uuid) {
      const booking = await this.scheduleRepository.findOne({
        uuid: booking_uuid,
      });
      if (!booking) {
        throw new Error('Agendamento não encontrado');
      }
      found = await this.scheduleRepository.findSchedules(booking.id, queryDto);
    } else {
      found = await this.scheduleRepository.findSchedules(null, queryDto);
    }
    return {
      schedules: found.schedules.map((event) => new ReturnScheduleDto(event)),
      total: found.total,
    };
  }

  async findOne(uuid: string) {
    const schedule = await this.scheduleRepository.findOne(
      { uuid },
      { relations: ['booking'] },
    );
    if (!schedule) {
      throw new Error('Schedule not found');
    }
    return new ReturnScheduleDto(schedule);
  }

  async update(uuid: string, updateScheduleDto: UpdateScheduleDto) {
    const result = await this.scheduleRepository.update(
      { uuid },
      updateScheduleDto,
    );
    if (result.affected === 0) {
      throw new Error('Agendamento não encontrado');
    }
    const schedule = await this.scheduleRepository.findOne(
      { uuid },
      { relations: ['booking'] },
    );
    return new ReturnScheduleDto(schedule);
  }

  async remove(uuid: string) {
    const result = await this.scheduleRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new Error('Agendamento não encontrado');
    }
  }
}
