import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/auth/guards/roles.guard';
import { CoreModule } from './core/core.module';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from './core/config/config.module';

@Module({
  imports: [CoreModule, ConfigModule, AuthModule, UsersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
