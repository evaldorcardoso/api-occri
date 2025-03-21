import { Test, TestingModule } from '@nestjs/testing';
import { ImagesRepository } from '../images/images.repository';
import { SpacesController } from './spaces.controller';
import { SpacesRepository } from './spaces.repository';
import { SpacesService } from './spaces.service';

describe('SpacesController', () => {
  let controller: SpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpacesController],
      providers: [
        SpacesService,
        {
          provide: SpacesRepository,
          useValue: {},
        },
        {
          provide: ImagesRepository,
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<SpacesController>(SpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
