import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // console.log(payload);

    const uuid = payload.user_id;
    const userData = await this.usersRepository.findOne({ uuid });

    if (!userData) {
      const userData: User = this.usersRepository.create(User);
      userData.uuid = payload.user_id;
      userData.email = payload.email;
      userData.name = payload.name;
      userData.picture = payload.picture;
      userData.email_verified = payload.email_verified;

      try {
        await userData.save();
        return userData;
      } catch (error) {
        console.log(error);
      }
    }

    if (userData.email !== payload.email) {
      userData.email = payload.email;
    }
    if (userData.name !== payload.name) {
      userData.name = payload.name;
    }
    if (userData.picture !== payload.picture) {
      userData.picture = payload.picture;
    }
    if (userData.email_verified !== payload.email_verified) {
      userData.email_verified = payload.email_verified;
    }

    try {
      await userData.save();
      return userData;
    } catch (error) {
      console.log(error);
    }

    return userData;
  }
}
