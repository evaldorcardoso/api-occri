import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { SpacesModule } from './spaces/spaces.module';
import { PlansModule } from './plans/plans.module';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';
import { SchedulesModule } from './schedules/schedules.module';
import { UsersRepository } from './users/users.repository';
import { typeOrmConfig } from './config/typeorm.config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // TypeOrmModule.forRootAsync({
    //   useFactory: async () =>
    //     Object.assign(await getConnectionOptions(), {
    //       autoLoadEntities: true,
    //     }),
    // }),
    UsersModule,
    SpacesModule,
    PlansModule,
    BookingsModule,
    EventsModule,
    SchedulesModule,
    TypeOrmModule.forFeature([UsersRepository]),
    HealthModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule { }
