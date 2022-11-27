import { BaseEntity, Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(['id'])
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false, type: 'varchar' })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', nullable: false })
  url: string

  @Column({ type: 'varchar', nullable: true })
  alt: string

  @CreateDateColumn()
  created_at: Date;
}