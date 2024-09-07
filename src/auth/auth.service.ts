import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, LogoutDto } from './auth.model';
import { AuthUnauthorized, jwtConstants } from '@model';
import { EncryptService } from 'src/core/services/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/services/prisma.service';
import { Auth } from 'src/model/auth.model';
import { pick } from 'lodash';
import { responseFormat } from '@core';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private encryptSer: EncryptService,
    private jwtSer: JwtService,
  ) {}

  async login(dto: LoginDto) {
    console.log('dto', dto);
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
      const data = this.createTokens(payload);
      return responseFormat(data, { message: `用户${userCode}登录成功` });
    }
  }

  async logout(dto: LogoutDto) {
    return responseFormat(null, { message: `用户${dto.userCode}登出成功` });
  }

  refreshToken(refreshToken: string) {
    try {
      const { id } = this.jwtSer.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      const data = this.createTokens({ id });
      return responseFormat(data, { message: '刷新token成功' });
    } catch (e) {
      throw new UnauthorizedException(
        AuthUnauthorized.TokenFailureOrValidationFailure,
      );
    }
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
