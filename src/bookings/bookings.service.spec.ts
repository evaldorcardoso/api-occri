import { Test, TestingModule } from '@nestjs/testing';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: BookingsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: BookingsRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<BookingsRepository>(BookingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
