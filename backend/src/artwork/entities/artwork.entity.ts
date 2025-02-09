import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  type: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1
  })
  price: number;

  @Column({ default: true })
  availability: boolean;
}
