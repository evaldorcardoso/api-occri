import { Test, TestingModule } from '@nestjs/testing';
import { SpacesRepository } from '../spaces/spaces.repository';
import { ScheduleRepository } from '../schedules/schedule.repository';
import { SchedulesService } from '../schedules/schedules.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        BookingsService, {
          provide: BookingsRepository,
          useValue: {
            createBooking: jest.fn(),
            findOne: jest.fn(),
            findBookings: jest.fn(),
          },
        },
        {
          provide: SpacesRepository,
          useValue: {}
        },
        SchedulesService, {
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

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
