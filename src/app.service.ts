import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static pong(): string {
    return 'pong';
  }
}
