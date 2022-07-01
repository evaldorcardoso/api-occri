import { Booking } from 'src/bookings/booking.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['id', 'uuid'])
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @ManyToOne(() => Booking, (booking) => booking.schedules, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ type: 'datetime', nullable: false })
  start_time: Date;

  @Column({ type: 'datetime', nullable: false })
  end_time: Date;
}
