import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/user-roles.enum';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import faker from '@faker-js/faker';

let app: INestApplication;
let userRepository: UsersRepository;

async function createUser(
  role: UserRole,
  is_active = true,
  userData?: CreateUserDto,
): Promise<User> {
  userData = userData
    ? userData
    : {
        uuid: '',
        name: '',
        email: '',
      };

  if (role === UserRole.ADMIN) {
    userData.email = userData.email ? userData.email : 'admin@email.com';
    userData.name = userData.name ? userData.name : 'ADMIN';
  } else if (role === UserRole.USER) {
    userData.email = userData.email ? userData.email : 'user@email.com';
    userData.name = userData.name ? userData.name : 'USER';
  }

  const user = await userRepository.create(userData);
  user.role = role;
  if (is_active) {
    user.is_active = true;
  }
  await user.save();

  return await userRepository.findOne(user.id);
}

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      UsersModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [User],
        synchronize: true,
        logging: false,
      }),
      TypeOrmModule.forFeature([UsersRepository]),
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  userRepository = moduleFixture.get(UsersRepository);
});

afterAll(async () => {
  await app.close();
});

afterEach(async () => {
  await userRepository.clear();
});

describe('Bookings CRUD', () => {
  it('should be able to create a booking with a normal user', async () => {
    const jwtToken = faker.random.numeric(10);
    const user = await createUser(UserRole.USER);

    const booking = {
      space_id: faker.random.numeric(10),
      plan_id: faker.random.numeric(10),
      quantity: 1,
      cpf: faker.random.numeric(11),
      name: faker.name.firstName(),
    };

    await request(app.getHttpServer())
      .post('/bookings')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(booking)
      .expect(201);
  });
});
