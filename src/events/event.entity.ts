import { Booking } from '../bookings/booking.entity';
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
@Index(['uuid', 'booking'])
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ nullable: false, type: 'longtext' })
  description: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  image_alt: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  image_url: string;

  @Column({ nullable: true, type: 'longtext' })
  contact_url: string;

  @ManyToOne(() => Booking, (booking) => booking.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;
}
