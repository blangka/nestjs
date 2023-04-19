import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
