import { EntityRepository, Repository } from 'typeorm';
import { FindEventsQueryDto } from './dto/find-spaces.dto';
import { Event } from './event.entity';

@EntityRepository(Event)
export class EventsRepository extends Repository<Event> {
  async findEvents(
    booking_id: number,
    queryDto: FindEventsQueryDto,
  ): Promise<{ events: Event[]; total: number }> {
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.limit = queryDto.limit === undefined ? 100 : queryDto.limit;

    const { name } = queryDto;
    const query = this.createQueryBuilder('event');

    if (name) {
      query.andWhere('space.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    if (booking_id > 0) {
      query.innerJoinAndSelect(
        'event.booking',
        'booking',
        'booking.id = event.booking_id AND booking.id = :booking_id',
        { booking_id },
      );
    } else {
      query.innerJoinAndSelect(
        'event.booking',
        'booking',
        'booking.id = event.booking_id',
      );
    }

    query.select([
      'event.uuid',
      'event.name',
      'event.description',
      'event.image_alt',
      'event.image_url',
      'event.contact_url',
      'event.created_at',
      'booking.uuid',
    ]);

    const [events, total] = await query.getManyAndCount();

    return { events, total };
  }
}
