import { Test, TestingModule } from '@nestjs/testing';
import { BookingsRepository } from '../bookings/bookings.repository';
import { ScheduleRepository } from './schedule.repository';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let repository: ScheduleRepository;
  let bookingsRepository: BookingsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: ScheduleRepository,
          useValue: {
            createSchedule: jest.fn(),
            findOne: jest.fn(),
            findSchedules: jest.fn(),
          },
        },
        {
          provide: BookingsRepository,
          useValue: {
            createBooking: jest.fn(),
            findOne: jest.fn(),
            findBookings: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
    repository = module.get<ScheduleRepository>(ScheduleRepository);
    bookingsRepository = module.get<BookingsRepository>(BookingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
