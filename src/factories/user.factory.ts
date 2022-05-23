import { define } from 'typeorm-seeding';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-roles.enum';

define(User, () => {
  const user = new User();
  user.name = 'Admin';
  user.email = 'admin@admin.com.br';
  user.role = UserRole.ADMIN;
  return user;
});
