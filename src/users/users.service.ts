import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptService, PrismaService } from '@core';

const select = {
  id: true,
  userCode: true,
  userName: true,
  email: true,
  mobile: true,
  telephone: true,
  remark: true,
  updatedAt: true,
  createdAt: true,
  creator: true,
  updater: true,
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private encryptSer: EncryptService,
  ) {
    //
  }
  create(createUserDto: CreateUserDto) {
    const salt = this.encryptSer.genSalt();
    const password = this.encryptSer.hash(createUserDto.password, salt);
    createUserDto.password = password;
    createUserDto.salt = salt;
    return this.prisma.aac_user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.aac_user.findMany({
      select,
    });
  }

  findOne(id: number) {
    return this.prisma.aac_user.findUnique({ where: { id }, select });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.aac_user.update({
      where: { id },
      data: updateUserDto,
      select,
    });
  }

  remove(id: number) {
    return this.prisma.aac_user.delete({ where: { id } });
  }
}
