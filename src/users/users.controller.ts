import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserDto } from '../dto/UserDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.usersService.findAll();

    const data = users.map((user) => {
      return UserDto.fromEntity(user);
    });
    return { message: 'success', res: data };
  }

  @Post()
  @ApiOperation({ summary: 'Create a user', description: 'Create a user' })
  @HttpCode(HttpStatus.OK)
  async create(@Body() userDto: UserDto) {
    const user = await this.usersService.create(userDto);
    const data = UserDto.fromEntity(user);
    return { message: 'success', res: data };
  }

  @Get('/error')
  @HttpCode(HttpStatus.OK)
  error() {
    this.usersService.error();
    return { message: 'success', res: null };
  }

  @Get('/findByName/:name')
  async findByName(@Param('name') name: string) {
    const user = await this.usersService.findByName(name);
    const data = user ? UserDto.fromEntity(user) : {};
    return { message: 'success', res: data };
  }

  @Get('/findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    const data = user ? UserDto.fromEntity(user) : {};
    return { message: 'success', res: data };
  }

  @Get('/error/sql')
  async errorSql() {
    const user = await this.usersService.errorSql();
    const data = user ? UserDto.fromEntity(user) : {};
    return { message: 'success', res: data };
  }

  @Get('/joinTest')
  async joinTest() {
    const data = await this.usersService.joinTest();
    return { message: 'success', res: data };
  }
}
