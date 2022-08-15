import { Plan } from '../plans/plan.entity';
import { Space } from '../spaces/space.entity';
import { User } from '../users/user.entity';
import { Event } from '../events/event.entity';
import { Schedule } from '../schedules/schedule.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BOOKING_STATUS } from './BookingStatus';

@Entity()
@Unique(['id', 'uuid'])
// @Index(['id', 'uuid'])
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @ManyToOne(() => Space, (space) => space.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @OneToMany(() => Event, (event) => event.booking)
  events: Event[];

  @OneToMany(() => Schedule, (schedule) => schedule.booking)
  schedules: Schedule[];

  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;

  @Column({ type: 'varchar', length: 14, nullable: false })
  cpf: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: BOOKING_STATUS.CREATED,
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
