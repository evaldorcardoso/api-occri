import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import { UsersRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: any;
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert('src/auth/api_occri_firebase.json'),
    });
  }
  async validate(token: string) {
    const firebaseAuth: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseAuth) {
      throw new UnauthorizedException();
    }

    const uuid = firebaseAuth.uid;
    const firebaseUser = await this.defaultApp.auth().getUser(uuid);
    const user = await this.usersRepository.findOne({ uuid });

    if (!user) {
      const user: User = this.usersRepository.create(User);
      user.uuid = firebaseUser.user_id;
      user.email = firebaseUser.email;
      user.name = firebaseUser.name;
      user.picture = firebaseUser.picture;
      user.email_verified = firebaseUser.email_verified;

      try {
        await user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    }

    user.email = firebaseUser.email ? firebaseUser.email : user.email;
    user.picture = firebaseUser.photoURL ? firebaseUser.photoURL : user.picture;
    user.email_verified = firebaseUser.emailVerified
      ? firebaseUser.emailVerified
      : user.email_verified;

    try {
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    }

    return user;
  }
}
