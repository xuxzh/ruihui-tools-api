import { Injectable } from '@nestjs/common';
import { LoginDto } from './auth.model';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    console.log(dto);
  }

  refreshToken() {
    console.log('works !!!');
  }
}
