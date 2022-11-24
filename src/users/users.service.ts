import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { ReturnUserDto } from './dto/return-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.create(createUserDto);
    return new ReturnUserDto(user);
  }

  async findUserByUuid(uuid: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findOne(
      { uuid, is_active: true },
      {
        select: ['email', 'name', 'role', 'uuid'],
      }
    );

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return new ReturnUserDto(user);
  }

  async updateUser(updateUserDto: UpdateUserDto, uuid: string) {
    const result = await this.userRepository.update(
      { uuid, is_active: true },
      updateUserDto
    );
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const user = await this.findUserByUuid(uuid);
    return user;
  }

  async deleteUser(uuid: string) {
    const result = await this.userRepository.update(
      { uuid },
      { is_active: false }
    );
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto
  ): Promise<{ users: User[]; total: number }> {
    return await this.userRepository.findUsers(queryDto);
  }
}
