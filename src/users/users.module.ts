import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { DataSource } from 'typeorm';
import { customUserRepositoryMethods } from '../repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        // 기존 repository를 custom 버전으로 overriding
        return dataSource
          .getRepository(User)
          .extend(customUserRepositoryMethods);
      },
    },
    UsersService,
  ],
})
export class UsersModule {}
