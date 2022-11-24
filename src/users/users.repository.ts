import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { UserRole } from './user-roles.enum';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findUsers(
    queryDto: FindUsersQueryDto
  ): Promise<{ users: User[]; total: number }> {
    queryDto.role =
      queryDto.role === undefined ? UserRole.ADMIN : queryDto.role;
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.limit = queryDto.limit === undefined ? 100 : queryDto.limit;

    const { email, name, role } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.is_active = true');
    query.andWhere('user.role = :role', { role });

    if (email) {
      query.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }
    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['user.uuid', 'user.name', 'user.email', 'user.role']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }
}
