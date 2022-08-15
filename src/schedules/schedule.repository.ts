import { Booking } from '../bookings/booking.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { User } from '../users/user.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async createSchedule(
    user: User,
    booking: Booking,
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    const schedule = this.create();
    if (user) {
      schedule.is_active = true;
    }
    schedule.start_time = createScheduleDto.start_time;
    schedule.end_time = createScheduleDto.end_time;

    try {
      await schedule.save();
      return schedule;
    } catch (error) {
      throw new Error(`Não foi possível criar o Agendamento: ${error.message}`);
    }
  }

  async findSchedules(
    booking_id: number,
    queryDto: FindSchedulesQueryDto,
  ): Promise<{ schedules: Schedule[]; total: number }> {
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.limit = queryDto.limit === undefined ? 100 : queryDto.limit;

    const { start_time, end_time } = queryDto;
    const query = this.createQueryBuilder('schedule');

    if (start_time) {
      query.andWhere('schedule.start_time >= :start_time', {
        start_time,
      });
    }

    if (end_time) {
      query.andWhere('schedule.end_time <= :end_time', {
        end_time,
      });
    }

    if (booking_id > 0) {
      query.innerJoinAndSelect(
        'schedule.booking',
        'booking',
        'booking.id = schedule.booking_id AND booking.id = :booking_id',
        { booking_id },
      );
    } else {
      query.innerJoinAndSelect(
        'schedule.booking',
        'booking',
        'booking.id = schedule.booking_id',
      );
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select([
      'schedule.id',
      'schedule.uuid',
      'schedule.start_time',
      'schedule.end_time',
      'booking.uuid',
    ]);

    const [schedules, total] = await query.getManyAndCount();

    return { schedules, total };
  }
}
