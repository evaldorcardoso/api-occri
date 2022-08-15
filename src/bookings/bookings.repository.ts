import { UnprocessableEntityException } from '@nestjs/common';
import { Plan } from '../plans/plan.entity';
import { User } from '../users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Space } from '../spaces/space.entity';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindBookingsQueryDto } from './dto/find-bookings-query.dto';

@EntityRepository(Booking)
export class BookingsRepository extends Repository<Booking> {
  async createBooking(
    user: User,
    createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    const space = await Space.findOne({ uuid: createBookingDto.space });
    const plan = await Plan.findOne({ uuid: createBookingDto.plan });

    if (!space) {
      throw new UnprocessableEntityException('Espaço não encontrado');
    }

    if (!plan) {
      throw new UnprocessableEntityException('Plano não encontrado');
    }

    const booking = this.create();
    if (user) {
      booking.user = user;
      booking.status = 'success';
    }
    booking.space = space;
    booking.plan = plan;
    booking.cpf = createBookingDto.cpf;
    booking.name = createBookingDto.name;

    try {
      await booking.save();
      return booking;
    } catch (error) {
      throw new Error(`Não foi possível criar a Reserva: ${error.message}`);
    }
  }

  async findBookings(
    queryDto: FindBookingsQueryDto,
  ): Promise<{ bookings: Booking[]; total: number }> {
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.limit = queryDto.limit === undefined ? 100 : queryDto.limit;

    const { space, user, plan, status, created_at } = queryDto;
    const query = this.createQueryBuilder('booking');

    if (space) {
      const space_id = await Space.findOne({ uuid: space }, { select: ['id'] });
      if (!space_id) {
        throw new UnprocessableEntityException('Espaço não encontrado');
      }
      query.innerJoinAndSelect(
        'booking.space',
        'space',
        'space.id = booking.space_id AND space.id = :space_id',
        { space_id: space_id.id },
      );
    } else {
      query.innerJoinAndSelect('booking.space', 'space');
    }

    if (user) {
      const user_id = await User.findOne({ uuid: user }, { select: ['id'] });
      if (!user_id) {
        throw new UnprocessableEntityException('Usuário não encontrado');
      }
      query.innerJoinAndSelect(
        'booking.user',
        'user',
        'user.id = booking.user_id AND user.id = :user_id',
        { user_id: user_id.id },
      );
    } else {
      query.leftJoinAndSelect('booking.user', 'user');
    }

    if (plan) {
      const plan_id = await Plan.findOne({ uuid: plan }, { select: ['id'] });
      if (!plan_id) {
        throw new UnprocessableEntityException('Plano não encontrado');
      }
      query.innerJoinAndSelect(
        'booking.plan',
        'plan',
        'plan.id = booking.plan_id AND plan.id = :plan_id',
        { plan_id: plan_id.id },
      );
    } else {
      query.innerJoinAndSelect('booking.plan', 'plan');
    }

    if (status) {
      query.andWhere('booking.status = :status', { status });
    }

    if (created_at) {
      query.andWhere('booking.created_at LIKE :created_at', {
        created_at: `%${created_at}%`,
      });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select([
      'booking.id',
      'booking.uuid',
      'booking.status',
      'booking.created_at',
      'booking.quantity',
      'booking.cpf',
      'booking.name',
      'space.uuid',
      'user.uuid',
      'plan.uuid',
    ]);

    const [bookings, total] = await query.getManyAndCount();
    return { bookings, total };
  }
}
