import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { usersDiskStorage } from '../../core/storage/users-disk-storage';
import { Mailer } from '../../core/mail/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    MulterModule.register({
      storage: usersDiskStorage,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Mailer],
  exports: [UsersService],
})
export class UsersModule {}
