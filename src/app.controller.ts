import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './features/users/enum/role.enum';
import { Roles } from './core/decorators/roles.decorator';

@Controller('/')
export class AppController {
  @Get('/ping')
  @Roles(Role.Public)
  ping(): string {
    return AppService.pong();
  }
}
