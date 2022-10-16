import { Plan } from '../plans/plan.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
@Unique(['uuid'])
export class Space extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'longtext' })
  description: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  image_url: string

  @Column({ nullable: true, type: 'varchar', length: 50 })
  image_alt: string

  @Column({ nullable: false, type: 'int' , default: 1})
  occupation_max: number

  @OneToMany(() => Plan, (plan) => plan.space)
  plans: Plan[];

  @OneToMany(() => Booking, (booking) => booking.space)
  bookings: Booking[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
