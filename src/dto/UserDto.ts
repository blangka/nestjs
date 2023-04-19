import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class UserDto {
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  static toEntity(dto: UserDto) {
    const user = new User();
    user.name = dto?.name;
    user.email = dto?.email;
    user.password = dto?.password;
    return user;
  }

  static fromEntity(entity: User) {
    const dto = new UserDto();
    dto.name = entity?.name;
    dto.email = entity?.email;
    dto.password = entity?.password;
    return dto;
  }
}
