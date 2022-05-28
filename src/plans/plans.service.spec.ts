import faker from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Space } from '../spaces/space.entity';
import { SpacesRepository } from '../spaces/spaces.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { Plan } from './plan.entity';
import { PlansRepository } from './plans.repository';
import { PlansService } from './plans.service';

function createPlan(
  uuid?: string,
  name?: string,
  description?: string,
  value?: number,
  space?: Space,
): Plan {
  const plan = new Plan();
  plan.uuid = uuid || faker.unique.toString();
  plan.name = name || faker.name.firstName();
  plan.description = description || faker.lorem.sentence();
  plan.value = value || faker.datatype.number();
  plan.space = space || new Space();
  return plan;
}

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
    space.id = faker.datatype.number(1);

    const plan = createPlan(
      null,
      createPlanDto.name,
      createPlanDto.description,
      createPlanDto.value,
      space,
    );
    const resolvedPlan = new ReturnPlanDto(plan);

    jest.spyOn(repository, 'create').mockImplementationOnce(() => plan);
    jest.spyOn(repository, 'save').mockImplementationOnce(() => {
      return Promise.resolve(plan);
    });

    const data = await service.create(space, createPlanDto);

    expect(data).toEqual(resolvedPlan);
  });

  it('should be able to find a plan by uuid', async () => {
    const plan = createPlan();
    const resolvedPlan = new ReturnPlanDto(plan);

    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(plan);
    });

    const data = await service.findOne(plan.uuid);

    expect(data).toEqual(resolvedPlan);
  });

  it('should be able to find plans by query string', async () => {
    const plan = createPlan();
    const anotherPlan = createPlan();

    const resolvedPlans = [
      new ReturnPlanDto(plan),
      new ReturnPlanDto(anotherPlan),
    ];

    jest.spyOn(spacesRepository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(new Space());
    });

    jest.spyOn(repository, 'findPlans').mockImplementationOnce(() => {
      return Promise.resolve(resolvedPlans);
    });

    const data = await service.findAll(faker.unique.toString());

    expect(data).toEqual(resolvedPlans);
  });

  it('should be able to update a plan', async () => {
    const plan = createPlan();
    const resolvedPlan = new ReturnPlanDto(plan);

    jest.spyOn(repository, 'update').mockResolvedValue(new UpdateResult());
    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(plan);
    });

    const data = await service.update(plan.uuid, resolvedPlan);

    expect(data).toEqual(resolvedPlan);
  });

  it('should be able to remove a plan', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(new DeleteResult());

    await service.remove(faker.unique.toString());
  });
});
