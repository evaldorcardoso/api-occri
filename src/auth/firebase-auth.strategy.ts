import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import { UsersRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserRole } from 'src/users/user-roles.enum';
require('dotenv').config({ silent: true });

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
      credential: firebase.credential.cert({        
        projectId: process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID.replace(/\\n/g, '\n') : undefined,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? process.env.FIREBASE_CLIENT_EMAIL.replace(/\\n/g, '\n') : undefined,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      }),
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
    const user = await this.usersRepository.findOne({ uuid: firebaseUser.uid });
    if (!user) {
      const user: User = this.usersRepository.create(User);
      user.uuid = firebaseUser.uid;
      user.email = firebaseUser.email;
      user.email == 'admin@admin.com.br'
        ? (user.role = UserRole.ADMIN)
        : (user.role = UserRole.USER);
      user.name = firebaseUser.displayName || firebaseUser.email;

      try {
        await user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
    }
    
    user.email = firebaseUser.email ? firebaseUser.email : user.email;

    try {
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    }

    return user;
  }
}