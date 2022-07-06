import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let repository: EventsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        {
          provide: EventsRepository,
          useValue: {
            createEvent: jest.fn(),
            findOne: jest.fn(),
            findEvents: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    repository = module.get<EventsRepository>(EventsRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
