import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Role } from '../../../features/users/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  private matchRoles(roles: string[], tokenRole: string): boolean {
    return roles.some(item => item === tokenRole);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
    const roles = this.reflector.get('roles', context.getHandler());

    if (roles.some(elem => elem === Role.Public)) return true;

    const request = context.switchToHttp().getRequest();
    const token = RolesGuard.getToken(request);
    const tokenRole = this.authService.decode(token)['role'];

    return this.matchRoles(roles, tokenRole);
  }

  private static getToken(req: Request): string {
    if (!req.headers['authorization'])
      throw new HttpException(
        'Please provide an authorization token',
        HttpStatus.BAD_REQUEST,
      );
    return req.headers['authorization'].split(' ')[1];
  }
}
