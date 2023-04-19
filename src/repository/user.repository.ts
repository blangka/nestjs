import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

export interface UserRepository extends Repository<User> {
  this: Repository<User>;

  findByName(name: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findByError(): Promise<User>;

  joinTest(): Promise<any>;
}

type CustomUserRepository = Pick<
  UserRepository,
  'findByName' | 'findByEmail' | 'findByError' | 'joinTest'
>;

export const customUserRepositoryMethods: CustomUserRepository = {
  findByName(name: string): Promise<User> {
    const user = this.findOne({
      where: { name: name },
      join: {},
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
  joinTest(): Promise<any> {
    const user = this.createQueryBuilder('u')
      .select(['u.id', 'g.id', 'g.name'])
      .leftJoinAndSelect('u.group', 'g')
      .where('u.id = :id', { id: 1 })
      .getOne();
    return user;
  },
};
