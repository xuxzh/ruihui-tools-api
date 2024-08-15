import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  userCode: string;

  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  salt: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ required: false })
  mobile?: string;
  @ApiProperty({ required: false })
  telephone?: string;
  @ApiProperty({ required: false })
  remark?: string;
  @ApiProperty({ required: false, default: false })
  deleted?: boolean;
}
