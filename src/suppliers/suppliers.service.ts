import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService, responseFormat } from '@core';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {
    //
  }
  create(createSupplierDto: CreateSupplierDto) {
    return this.prisma.supplier_list.create({ data: createSupplierDto });
  }

  async findAll() {
    const data = await this.prisma.supplier_list.findMany();
    return responseFormat(data, { message: '获取供应商数据成功' });
  }

  findOne(id: number) {
    const data = this.prisma.supplier_list.findUnique({ where: { id } });
    return responseFormat(data, { message: '获取指定供应商数据成功' });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const data = this.prisma.supplier_list.update({
      where: { id },
      data: updateSupplierDto,
    });
    return responseFormat(data, { message: '更新指定供应商数据成功！' });
  }

  remove(id: number) {
    const data = this.prisma.supplier_list.delete({ where: { id } });
    return responseFormat(data, { message: '删除指定供应商数据成功' });
  }
}
