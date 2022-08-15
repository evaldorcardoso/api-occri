import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { FirebaseAuthStrategy } from 'src/auth/firebase-auth.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService, FirebaseAuthStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
