import { Space } from '../spaces/space.entity';
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
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';

export const PLAN_TYPES = {
  HOUR: 'hour',
  DAY: 'day',
  SHIFT: 'shift',
  MONTH: 'month',
};

@Entity()
@Index(['id', 'uuid'])
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  value: number;

  @Column({ nullable: true, type: 'longtext' })
  description: string;

  @ManyToOne(() => Space, (space) => space.plans, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @OneToMany(() => Booking, (booking) => booking.plan)
  bookings: Booking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
