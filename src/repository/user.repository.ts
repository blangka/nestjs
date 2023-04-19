import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

export interface UserRepository extends Repository<User> {
  this: Repository<User>;

  findByName(name: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByError(): Promise<User>;
}

type CustomUserRepository = Pick<
  UserRepository,
  'findByName' | 'findByEmail' | 'findByError'
>;

export const customUserRepositoryMethods: CustomUserRepository = {
  findByName(name: string): Promise<User> {
    const user = this.findOne({
      where: { name: name },
    });
    return user;
  },
  findByEmail(email: string): Promise<User> {
    const user = this.findOne({
      where: { email: email },
    });
    return user;
  },
  findByError(): Promise<User> {
    const user = this.findOne({
      where: { test: 'test' },
    });
    return user;
  },
};
