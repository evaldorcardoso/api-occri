import faker from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from '../schedules/schedules.service';
import { Plan } from '../plans/plan.entity';
import { Space } from '../spaces/space.entity';
import { User } from '../users/user.entity';
import { Booking } from './booking.entity';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindBookingsQueryDto } from './dto/find-bookings-query.dto';
import { ReturnBookingDto } from './dto/return-booking.dto';
import { ScheduleRepository } from '../schedules/schedule.repository';
import { Schedule } from '../schedules/schedule.entity';
import { SCHEDULE_STATUS } from '../schedules/ScheduleStatus';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: BookingsRepository;
  let scheduleRepository: ScheduleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: BookingsRepository,
          useValue: {
            createBooking: jest.fn(),
            findOne: jest.fn(),
            findBookings: jest.fn(),
          },
        },
        SchedulesService,
        {
          provide: BookingsRepository,
          useValue: {
            createBooking: jest.fn(),
            findOne: jest.fn(),
            findBookings: jest.fn(),
          },
        },
        {
          provide: ScheduleRepository,
          useValue: {
            createSchedule: jest.fn(),
            findOne: jest.fn(),
            findSchedules: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<BookingsRepository>(BookingsRepository);
    scheduleRepository = module.get<ScheduleRepository>(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a booking', async () => {
    const createBookingDto = new CreateBookingDto();
    createBookingDto.plan = faker.datatype.uuid();
    createBookingDto.space = faker.datatype.uuid();
    createBookingDto.cpf = '41952767059';

    const user = new User();

    const booking = new Booking();
    booking.uuid = faker.datatype.uuid();
    booking.plan = new Plan();
    booking.space = new Space();
    booking.user = user;

    const schedule = new Schedule();
    schedule.uuid = faker.datatype.uuid();
    schedule.booking = booking;
    schedule.start_time = new Date();
    schedule.end_time = new Date();
    schedule.status = SCHEDULE_STATUS.CREATED;
    schedule.is_active = true;

    const resolvedBooking = new ReturnBookingDto(booking);

    jest.spyOn(repository, 'createBooking').mockImplementationOnce(() => {
      return Promise.resolve(booking);
    });

    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(booking);
    });

    jest
      .spyOn(scheduleRepository, 'createSchedule')
      .mockImplementationOnce(() => {
        return Promise.resolve(schedule);
      });

    const result = await service.create(user, createBookingDto);

    expect(result).toEqual(resolvedBooking);
  });

  it('should be able to find a booking by uuid', async () => {
    const plan = new Plan();
    const space = new Space();
    const user = new User();
    const booking = new Booking();
    booking.plan = plan;
    booking.space = space;
    booking.user = user;
    booking.uuid = faker.datatype.uuid();

    const resolvedBooking = new ReturnBookingDto(booking);

    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(booking);
    });

    const result = await service.findOne(booking.uuid);

    expect(result).toEqual(resolvedBooking);
  });

  it('should be able to find a booking by user and space', async () => {
    const plan = new Plan();
    const space = new Space();
    const user = new User();
    const booking = new Booking();
    booking.plan = plan;
    booking.space = space;
    booking.user = user;

    const resolvedBooking = new ReturnBookingDto(booking);
    const ReturnFindBookingsDto = [resolvedBooking];

    const queryDto = new FindBookingsQueryDto();

    jest.spyOn(repository, 'findBookings').mockImplementationOnce(() => {
      return Promise.resolve({
        bookings: [booking],
        total: ReturnFindBookingsDto.length,
      });
    });

    const result = await service.findAll(queryDto);

    expect(result).toEqual({
      bookings: ReturnFindBookingsDto,
      total: ReturnFindBookingsDto.length,
    });
  });
});
