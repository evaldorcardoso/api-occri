import { createParamDecorator } from '@nestjs/common';
import { User } from '../users/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  console.log(req);
  const user = req.args[0].user;
  return user;
});
