import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
    //
  }
  create(createUserDto: CreateUserDto) {
    return this.prisma.aac_user.create({ data: createUserDto, select });
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
