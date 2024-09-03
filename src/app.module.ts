import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from '@core';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [GlobalModule, UsersModule, AuthModule, SuppliersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
