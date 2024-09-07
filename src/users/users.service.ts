import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EncryptService, PrismaService, responseFormat } from '@core';

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
    const data = this.prisma.aac_user.create({ data: createUserDto });
    return responseFormat(data, { message: '创建用户成功' });
  }

  findAll() {
    const data = this.prisma.aac_user.findMany({
      select,
    });
    return responseFormat(data, { message: '获取用户数据成功' });
  }

  findOne(id: number) {
    const data = this.prisma.aac_user.findUnique({ where: { id }, select });
    return responseFormat(data, { message: '获取指定用户数据成功' });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const data = this.prisma.aac_user.update({
      where: { id },
      data: updateUserDto,
      select,
    });
    return responseFormat(data, { message: '更新指定用户数据成功' });
  }

  remove(id: number) {
    const data = this.prisma.aac_user.delete({ where: { id } });
    return responseFormat(data, { message: '删除指定用户数据成功' });
  }
}
