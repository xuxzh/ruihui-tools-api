import { ApiProperty } from '@nestjs/swagger';
import { aac_user } from '@prisma/client';
export class UserEntity implements aac_user {
  @ApiProperty()
  id: number;
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
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  telephone: string;
  @ApiProperty()
  remark: string;
  @ApiProperty()
  deleted: boolean;
  @ApiProperty()
  deletedAt: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
