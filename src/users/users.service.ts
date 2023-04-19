import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/UserDto';
import { DUPLICATE_USER_ERROR } from '../util/error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const user = UserDto.toEntity(userDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByName(name: string): Promise<User> {
    return this.userRepository.findByName(name);
  }

  async findByEmail(name: string): Promise<User> {
    return this.userRepository.findByEmail(name);
  }

  async errorSql(): Promise<User> {
    return this.userRepository.findByError();
  }

  error() {
    throw new HttpException(DUPLICATE_USER_ERROR, 500);
  }
}
