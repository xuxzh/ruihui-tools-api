import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
    //
  }
  create(createUserDto: CreateUserDto) {
    return this.prisma.aac_user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.aac_user.findMany();
  }

  findOne(id: number) {
    return this.prisma.aac_user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.aac_user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.aac_user.delete({ where: { id } });
  }
}
