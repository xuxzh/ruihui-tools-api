import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '@core';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {
    //
  }
  create(createSupplierDto: CreateSupplierDto) {
    return this.prisma.supplier_list.create({ data: createSupplierDto });
  }

  findAll() {
    return this.prisma.supplier_list.findMany();
  }

  findOne(id: number) {
    return this.prisma.supplier_list.findUnique({ where: { id } });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.prisma.supplier_list.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  remove(id: number) {
    return this.prisma.supplier_list.delete({ where: { id } });
  }
}
