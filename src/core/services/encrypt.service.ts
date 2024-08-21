import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class EncryptService {
  static saltRounds = 10;

  constructor() {}

  genSalt() {
    return genSaltSync(EncryptService.saltRounds);
  }

  hash(data: string, salt?: string) {
    return hashSync(data, salt || this.genSalt());
  }

  compare(data: string, hash: string) {
    return compareSync(data, hash);
  }
}
