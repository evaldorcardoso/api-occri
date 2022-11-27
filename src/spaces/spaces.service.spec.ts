import faker from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ImagesRepository } from '../images/images.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { FindSpacesQueryDto } from './dto/find-spaces-query.dto';
import { ReturnFindSpacesDto } from './dto/return-find-spaces.dto';
import { ReturnSpaceWithPlansDto } from './dto/return-space-with-plans.dto';
import { ReturnSpaceDto } from './dto/return-space.dto';
import { Space } from './space.entity';
import { SpacesRepository } from './spaces.repository';
import { SpacesService } from './spaces.service';

describe('SpacesService', () => {
  let service: SpacesService;
  let repository: SpacesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpacesService,
        {
          provide: SpacesRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findSpaces: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ImagesRepository,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<SpacesService>(SpacesService);
    repository = module.get<SpacesRepository>(SpacesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a space', async () => {
    const createSpaceDto = new CreateSpaceDto();
    createSpaceDto.name = faker.name.findName();
    createSpaceDto.description = faker.lorem.sentence();

    const space = new Space();
    space.uuid = faker.unique.toString();
    space.name = createSpaceDto.name;
    space.description = createSpaceDto.description;
    space.occupation_max = 1;
    space.plans = [];
    space.images = [];
    const resolvedSpace = new ReturnSpaceDto(space);

    jest.spyOn(repository, 'create').mockImplementationOnce(() => space);
    jest.spyOn(repository, 'save').mockImplementationOnce(() => {
      return Promise.resolve(space);
    });

    const data = await service.create(createSpaceDto);

    expect(data).toEqual(resolvedSpace);
  });

  it('should be able to find a space by uuid', async () => {
    const space = new Space();
    space.uuid = faker.unique.toString();
    space.name = faker.name.findName();
    space.description = faker.lorem.sentence();
    space.occupation_max = 1;
    space.plans = [];
    space.images = [];
    const resolvedSpace = new ReturnSpaceWithPlansDto(space);

    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(space);
    });

    const data = await service.findOne(space.uuid);

    expect(data).toEqual(resolvedSpace);
  });

  it('should be able to find spaces by query string', async () => {
    const space = new Space();
    space.uuid = faker.unique.toString();
    space.name = faker.name.findName();
    space.occupation_max = 1;
    space.plans = [];

    const resolvedSpaces = new ReturnFindSpacesDto();
    resolvedSpaces.spaces = [space];
    resolvedSpaces.total = 1;

    const queryDto = new FindSpacesQueryDto();
    queryDto.name = space.name;

    jest.spyOn(repository, 'findSpaces').mockImplementationOnce(() => {
      return Promise.resolve(resolvedSpaces);
    });

    const data = await service.findAll(queryDto);

    expect(data).toEqual(resolvedSpaces);
  });

  it('should be able to update a space', async () => {
    const space = new Space();
    space.uuid = faker.unique.toString();
    space.name = faker.name.findName();
    space.description = faker.lorem.sentence();
    space.images = [];
    const resolvedSpace = new ReturnSpaceDto(space);

    jest.spyOn(repository, 'update').mockResolvedValue(new UpdateResult());
    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(space);
    });

    const data = await service.update(space.uuid, space);

    expect(data).toEqual(resolvedSpace);
  });

  it('should be able to update a space, setting image_url and image_alt', async () => {
    const space = new Space();
    space.uuid = faker.unique.toString();
    space.name = faker.name.findName();
    space.description = faker.lorem.sentence();
    space.image_url = faker.image.imageUrl();
    space.image_alt = faker.word.verb();
    const resolvedSpace = new ReturnSpaceDto(space);

    jest.spyOn(repository, 'update').mockResolvedValue(new UpdateResult());
    jest.spyOn(repository, 'findOne').mockImplementationOnce(() => {
      return Promise.resolve(space);
    });

    const data = await service.update(space.uuid, space);

    expect(data).toEqual(resolvedSpace);
  });

  it('should be able to remove a space', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(new DeleteResult());

    await service.remove(faker.unique.toString());
  });
});
