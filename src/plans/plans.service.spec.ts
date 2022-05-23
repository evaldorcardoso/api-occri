import faker from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { Space } from '../spaces/space.entity';
import { SpacesRepository } from '../spaces/spaces.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { Plan } from './plan.entity';
import { PlansRepository } from './plans.repository';
import { PlansService } from './plans.service';

describe('PlansService', () => {
  let service: PlansService;
  let repository: PlansRepository;
  let spacesRepository: SpacesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        {
          provide: PlansRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findPlans: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: SpacesRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    repository = module.get<PlansRepository>(PlansRepository);
    spacesRepository = module.get<SpacesRepository>(SpacesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a plan', async () => {
    const createPlanDto = new CreatePlanDto();
    createPlanDto.name = faker.name.findName();
    createPlanDto.description = faker.lorem.sentence();
    createPlanDto.value = parseFloat(faker.commerce.price());

    const space = new Space();
    space.id = faker.random.number();

    const plan = new Plan();
    plan.uuid = faker.unique.toString();
    plan.name = createPlanDto.name;
    plan.description = createPlanDto.description;
    plan.value = createPlanDto.value;
    plan.space = space;
    const resolvedPlan = new ReturnPlanDto(plan);

    jest.spyOn(repository, 'create').mockImplementationOnce(() => plan);
    jest.spyOn(repository, 'save').mockImplementationOnce(() => {
      return Promise.resolve(plan);
    });

    const data = await service.create(space, createPlanDto);

    expect(data).toEqual(resolvedPlan);
  });
});
