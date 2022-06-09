import { Plan } from '../plans/plan.entity';
import { Space } from '../spaces/space.entity';
import { User } from '../users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from 'src/events/event.entity';

@Entity()
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
    nullable: false,
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

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'created' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
