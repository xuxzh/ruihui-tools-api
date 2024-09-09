import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService, responseFormat } from '@core';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {
    //
  }
  async create(createSupplierDto: CreateSupplierDto) {
    const data = await this.prisma.supplier_list.create({
      data: createSupplierDto,
    });
    return responseFormat(data, { message: '创建供应商成功' });
  }

  async findAll() {
    const data = await this.prisma.supplier_list.findMany();
    return responseFormat(data, { message: '获取供应商数据成功' });
  }

  async findOne(id: number) {
    const data = await this.prisma.supplier_list.findUnique({ where: { id } });
    return responseFormat(data, { message: '获取指定供应商数据成功' });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const data = await this.prisma.supplier_list.update({
      where: { id },
      data: updateSupplierDto,
    });
    return responseFormat(data, { message: '更新指定供应商数据成功！' });
  }

  async remove(id: number) {
    const data = await this.prisma.supplier_list.delete({ where: { id } });
    return responseFormat(data, { message: '删除指定供应商数据成功' });
  }
}
