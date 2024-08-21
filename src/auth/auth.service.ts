import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './auth.model';
import { AuthUnauthorized, jwtConstants } from '@model';
import { EncryptService } from 'src/core/services/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/services/prisma.service';
import { Auth } from 'src/model/auth.model';
import { pick } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private encryptSer: EncryptService,
    private jwtSer: JwtService,
  ) {}
  async login(dto: LoginDto) {
    const { userCode } = dto;
    const findUser = await this.prisma.aac_user.findUnique({
      select: { id: true, password: true, userName: true, userCode: true },
      where: { userCode },
    });
    let id = -1;
    if (findUser === null) {
      throw new UnauthorizedException(
        AuthUnauthorized.AccountOrPasswordVerificationFailed,
      );
    }
    if (this.encryptSer.compare(dto.password, findUser.password)) {
      id = findUser.id;
    }
    if (id === -1) {
      throw new UnauthorizedException(
        AuthUnauthorized.AccountOrPasswordVerificationFailed,
      );
    } else {
      const payload = pick(findUser, ['id', 'userCode', 'userName']);
      return this.createTokens(payload);
    }
  }

  refreshToken() {
    console.log('works !!!');
  }

  private createTokens(payload: { id: number }): Auth {
    return {
      accessToken: this.jwtSer.sign(payload, { secret: jwtConstants.secret }),
      refreshToken: this.jwtSer.sign(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshExpiresIn,
      }),
    };
  }
}
