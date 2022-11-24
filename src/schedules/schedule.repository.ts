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
    createScheduleDto: CreateScheduleDto
  ): Promise<Schedule> {
    const schedule = this.create();
    if (user) {
      schedule.is_active = true;
    }
    schedule.start_time = createScheduleDto.start_time;
    schedule.end_time = createScheduleDto.end_time;
    schedule.booking = booking;

    try {
      await schedule.save();
      return schedule;
    } catch (error) {
      throw new Error(`Não foi possível criar o Agendamento: ${error.message}`);
    }
  }

  async findSchedules(
    queryDto: FindSchedulesQueryDto,
    booking_id?: number,
    space_id?: number
  ): Promise<{ schedules: Schedule[]; total: number }> {
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.limit = queryDto.limit === undefined ? 100 : queryDto.limit;

    const { start_time, end_time } = queryDto;
    const query = this.createQueryBuilder('schedule');
    query.select([
      'schedule.id',
      'schedule.uuid',
      'schedule.start_time',
      'schedule.end_time',
      'booking.uuid as booking',
    ]);

    let sqlJoin = 'booking.id = schedule.booking_id';
    sqlJoin += booking_id ? ' AND booking.id = :booking_id' : '';
    sqlJoin += space_id ? ' AND booking.space_id = :space_id' : '';

    query.innerJoinAndSelect(
      'schedule.booking',
      'booking',
      sqlJoin,
      { booking_id, space_id }
    );

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

    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);

    const [schedules, total] = await query.getManyAndCount();

    return { schedules, total };
  }

  async findAvailableSchedules(
    startTime: Date,
    endTime: Date,
    space_id: number
  ): Promise<{ total: number }> {
    const query = this.createQueryBuilder('schedule');
    query.select([
      'schedule.id',
      'schedule.uuid',
      'schedule.start_time',
      'schedule.end_time',
      'booking.uuid as booking',
    ]);

    query.innerJoinAndSelect(
      'schedule.booking',
      'booking',
      'booking.id = schedule.booking_id AND booking.space_id = :space_id',
      { space_id }
    );

    query.andWhere('schedule.start_time BETWEEN :start_time AND :end_time', {
      start_time: startTime,
      end_time: endTime
    });

    query.orWhere('schedule.end_time BETWEEN :start_time AND :end_time', {
      start_time: startTime,
      end_time: endTime
    });

    const total = await query.getCount();

    return { total };
  }

}
