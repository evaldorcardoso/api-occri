import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-spaces.dto';
import { ReturnEventDto } from './dto/return-event.dto';
import { ReturnFindEventsDto } from './dto/return-find-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsRepository)
    private eventsRepository: EventsRepository,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<ReturnEventDto> {
    const event = this.eventsRepository.create(createEventDto);
    await this.eventsRepository.save(event);
    return new ReturnEventDto(event);
  }

  async findAll(
    booking_uuid: string,
    queryDto: FindEventsQueryDto,
  ): Promise<ReturnFindEventsDto> {
    let booking;

    if (booking_uuid) {
      booking = await this.eventsRepository.findOne({
        uuid: booking_uuid,
      });
      if (!booking) {
        throw new NotFoundException('Reserva informada não encontrada');
      }
    }

    const found = await this.eventsRepository.findEvents(
      booking ? booking.id : 0,
      queryDto,
    );

    return {
      events: found.events.map((event) => new ReturnEventDto(event)),
      total: found.total,
    };
  }

  async findOne(uuid: string): Promise<ReturnEventDto> {
    const event = await this.eventsRepository.findOne({ uuid });
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
    return new ReturnEventDto(event);
  }

  async update(
    uuid: string,
    updateEventDto: UpdateEventDto,
  ): Promise<ReturnEventDto> {
    const result = await this.eventsRepository.update({ uuid }, updateEventDto);
    if (result.affected === 0) {
      throw new NotFoundException('Evento não encontrado');
    }
    const event = await this.eventsRepository.findOne({ uuid });
    return new ReturnEventDto(event);
  }

  async remove(uuid: string) {
    const result = await this.eventsRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new NotFoundException('Evento não encontrado');
    }
  }
}
