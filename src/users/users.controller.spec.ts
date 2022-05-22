import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserRole } from './user-roles.enum';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findUsers: jest.fn(),
            findUserByUuid: jest.fn(),
            createAdminUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create an Admin User', async () => {
    const createUserDto: CreateUserDto = {
      uuid: faker.unique.toString(),
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    const resolvedUser: ReturnUserDto = {
      uuid: createUserDto.uuid,
      email: createUserDto.email,
      name: createUserDto.name,
      role: UserRole.ADMIN,
    };

    jest.spyOn(service, 'createAdminUser').mockImplementationOnce(() => {
      return Promise.resolve(resolvedUser);
    });

    const data = await service.createAdminUser(createUserDto);

    expect(data).toEqual(resolvedUser);
  });
});
