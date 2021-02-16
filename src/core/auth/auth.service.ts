import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../features/users/users.service';
import { UsersEntity } from '../../features/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  createToken(user: UsersEntity) {
    const expiresIn = 3600;

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      'imasecret',
      { expiresIn },
    );
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(token: string): Promise<UsersEntity> {
    try {
      const id = await this.jwtService.decode(token)['id'];
      return this.usersService.findById(id);
    } catch {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }
}
