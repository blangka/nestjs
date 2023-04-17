import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dto/UserDto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  static fromDto(dto: UserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }
}
